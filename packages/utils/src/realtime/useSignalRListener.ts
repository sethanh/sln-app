import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

type Primitive = string | number | boolean | null | undefined;

export interface UseSignalRListenerProps<TContext extends Record<string, Primitive>> {
  hubUrl: string;
  accessToken?: string;
  context?: TContext;
  eventPatterns: string[];
  onEvent: (eventKey: string, payload: any) => void;
  debounceMs?: number; // optional, mặc định 300ms
  log?: boolean;
}

/**
 * Hook tái sử dụng để lắng nghe SignalR event theo context động
 */
export function useSignalRListener<TContext extends Record<string, Primitive>>({
  hubUrl,
  accessToken,
  context,
  eventPatterns,
  onEvent,
  debounceMs = 300,
  log = true,
}: UseSignalRListenerProps<TContext>) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Utility: resolve pattern với context
  const resolvePattern = (pattern: string, ctx?: TContext) => {
    if (!ctx) return pattern;
    return pattern.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
      const value = ctx[key as keyof TContext];
      return value !== undefined && value !== null ? String(value) : `:${key}`;
    });
  };

  useEffect(() => {
    if (!hubUrl) return;

    // ⏳ debounce reconnect
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (connectionRef.current) {
        if (log) console.log("🔴 Closing previous SignalR connection...");
        connectionRef.current.stop();
        connectionRef.current = null;
      }

      // 🧩 Resolve các key thực tế cần listen
      const resolvedKeys = eventPatterns.map((p) => resolvePattern(p, context));

      if (log)
        console.log("🔄 Setting up SignalR connection", {
          hubUrl,
          resolvedKeys,
          context,
        });

      const connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory: accessToken ? () => accessToken : undefined,
        })
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      connectionRef.current = connection;

      // Đăng ký event listener
      resolvedKeys.forEach((key) => {
        connection.on(key, (payload: any) => {
          if (log) console.log("📡 SignalR received:", key, payload);
          onEvent(key, payload);
        });
      });

      // Bắt đầu kết nối
      connection
        .start()
        .then(() => {
          if (log) console.log("🟢 SignalR connected:", resolvedKeys);
        })
        .catch((err) => {
          console.error("❌ SignalR connection error:", err);
        });

      // cleanup
      return () => {
        if (log) console.log("🧹 Cleaning up SignalR connection...");
        connection.stop();
      };
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hubUrl, accessToken, JSON.stringify(context), JSON.stringify(eventPatterns)]);
}
