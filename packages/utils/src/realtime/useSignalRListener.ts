// utils/useSignalRListener.ts
import { useEffect, useMemo, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export type RealtimeContext = Record<string, string | number | boolean | null | undefined>;

export type RealtimeListenerOptions<TContext extends RealtimeContext> = {
  hubUrl: string;                         // ví dụ: `${VITE_SIGNALR_URL}/hub/realtime`
  eventPatterns: string[];                // ví dụ: ["NOTIFY-:accountId"]
  context?: TContext;                     // ví dụ: { accountId: "..." }
  /** Nếu có auth token, truyền factory vào đây (vd: Bearer) */
  accessTokenFactory?: () => string | Promise<string>;
  /** Mặc định: false -> sẽ bắn cả DataFetched lúc Subscribe */
  onlyWatchForDataChange?: boolean;
  /** Nhận mọi sự kiện, đã kèm meta (key, eventName, changeType) */
  onEvent?: (
    resolvedKey: string,
    eventName:
      | "DataFetched"
      | "DataModified"
      | "DataAdded"
      | "DataRemoved"
      | "ChildDataFetched"
      | "ChildDataModified"
      | "ChildDataAdded"
      | "ChildDataRemoved"
      | "Connected"
      | "Error",
    payload: unknown
  ) => void;
  /** Tùy chọn debug log */
  debug?: boolean;
};

const SERVER_EVENTS = [
  "DataFetched",
  "DataModified",
  "DataAdded",
  "DataRemoved",
  "ChildDataFetched",
  "ChildDataModified",
  "ChildDataAdded",
  "ChildDataRemoved",
  "Connected",
  "Error",
] as const;
type ServerEventName = (typeof SERVER_EVENTS)[number];

/** Thay :token trong pattern bằng giá trị trong context */
const resolvePattern = <TContext extends RealtimeContext>(pattern: string, ctx?: TContext) => {
  if (!ctx) return pattern;
  return pattern.replace(/:([a-zA-Z0-9_]+)/g, (_m, key) => {
    const v = ctx[key as keyof TContext];
    return v !== undefined && v !== null ? String(v) : `:${key}`;
  });
};

export function useSignalRListener<TContext extends RealtimeContext>(opts: RealtimeListenerOptions<TContext>) {
  const {
    hubUrl,
    eventPatterns,
    context,
    accessTokenFactory,
    onlyWatchForDataChange = false,
    onEvent,
    debug = false,
  } = opts;

  const connRef = useRef<signalR.HubConnection | null>(null);
  const keysRef = useRef<string[]>([]);
  const startedRef = useRef(false);

  const resolvedKeys = useMemo(
    () => Array.from(new Set(eventPatterns.map(p => resolvePattern(p, context)).filter(Boolean))),
    [eventPatterns, context]
  );

  useEffect(() => {
    let disposed = false;

    const buildConnection = () => {
      const builder = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory,
          transport: signalR.HttpTransportType.WebSockets,
          skipNegotiation: true, // dùng WebSocket trước, rơi xuống negotiate nếu cần => có thể tắt nếu proxy không hỗ trợ
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (ctx) => {
            // backoff nhẹ: 0s, 2s, 5s, 10s, tối đa 10s
            const seq = [0, 2000, 5000, 10000];
            return seq[Math.min(ctx.previousRetryCount, seq.length - 1)];
          },
        })
        .configureLogging(debug ? signalR.LogLevel.Information : signalR.LogLevel.None);

      return builder.build();
    };

    const startAndWire = async () => {
      if (disposed) return;
      if (!connRef.current) connRef.current = buildConnection();
      const connection = connRef.current;

      // Đăng ký handler cho tất cả server events
      SERVER_EVENTS.forEach((evt) => {
        connection.off(evt); // tránh đăng ký lặp
        connection.on(evt, (payload: unknown) => {
          if (debug) console.log(`[SignalR] ${evt}`, payload);
          // Forward đến consumer cho từng key đã subscribe (nhiều key có thể cùng nghe 1 event)
          // Ở server payload item thường có .Key, nhưng không bắt buộc; ta cứ bắn cả bộ keys.
          resolvedKeys.forEach(k => onEvent?.(k, evt as ServerEventName, payload));
        });
      });

      connection.onreconnected(async () => {
        if (debug) console.log("[SignalR] Reconnected. Resubscribing keys...");
        await subscribeAll(connection, resolvedKeys, onlyWatchForDataChange, debug);
      });

      connection.onclose(() => {
        startedRef.current = false;
        if (debug) console.log("[SignalR] Connection closed");
      });

      if (connection.state === signalR.HubConnectionState.Disconnected) {
        await connection.start();
        startedRef.current = true;
        if (debug) console.log("[SignalR] Connected:", connection.connectionId);
      }

      await subscribeAll(connection, resolvedKeys, onlyWatchForDataChange, debug);
    };

    startAndWire().catch((e) => {
      if (debug) console.error("[SignalR] start error:", e);
    });

    return () => {
      disposed = true;
      (async () => {
        try {
          if (connRef.current) {
            await connRef.current.stop();
          }
        } catch {
          /* noop */
        } finally {
          connRef.current = null;
          startedRef.current = false;
          keysRef.current = [];
        }
      })();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hubUrl, accessTokenFactory, debug]); // khởi tạo connection theo URL/token

  // (Re)subscribe khi danh sách key thay đổi
  useEffect(() => {
    (async () => {
      const connection = connRef.current;
      if (!connection || connection.state !== signalR.HubConnectionState.Connected) return;
      await subscribeAll(connection, resolvedKeys, onlyWatchForDataChange, debug);
    })();
  }, [resolvedKeys, onlyWatchForDataChange, debug]);

  return null;
}

async function subscribeAll(
  connection: signalR.HubConnection,
  keys: string[],
  onlyWatchForDataChange: boolean,
  debug: boolean
) {
  const unique = Array.from(new Set(keys));
  for (const key of unique) {
    try {
      // Gọi đúng method server RealtimeHub.Subscribe
      await connection.invoke("Subscribe", {
        Key: key,
        OnlyWatchForDataChange: onlyWatchForDataChange,
      });
      if (debug) console.log(`[SignalR] Subscribed: ${key}`);
    } catch (e) {
      if (debug) console.error(`[SignalR] Subscribe failed: ${key}`, e);
    }
  }
}
