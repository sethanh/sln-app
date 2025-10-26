import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useRef, useState } from "react";
import { appConstant } from "@my-monorepo/payflash/Constants";
import { RealtimeKeys, RealtimeMethods, realtimeSubscribesArg } from "../Types";
import { currentAccountAtom, currentConversation } from "../../Store";
import { useAtom } from "jotai";

export const useRealtimeInit = () => {
  const [account] = useAtom(currentAccountAtom);
  const [conversation] = useAtom(currentConversation);
  const [realtimeConn, setRealtimeConn] = useState<HubConnection>();

  // Dùng ref để nhớ conversation trước đó
  const prevConversationId = useRef<string | undefined>();

  // 🧩 Khởi tạo connection khi account thay đổi
  useEffect(() => {
    if (!account?.id) return;

    const connection = new HubConnectionBuilder()
      .withUrl(appConstant.realTimHub, {
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    const start = async () => {
      try {
        await connection.start();
        console.log("🟢 SignalR Connected");

        realtimeSubscribesArg?.forEach((realtimeArg) => {
          const arg = {
            ...realtimeArg,
            key: `${realtimeArg.key}-${account.id}`,
          };
          if(realtimeArg.key !== RealtimeKeys.MessageRefresh)
          { 
            connection.invoke(RealtimeMethods.Subscribe, arg);
          }
        });

        setRealtimeConn(connection);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("❌ SignalR start error:", error);
        setTimeout(start, 5000);
      }
    };

    connection.onclose(async () => {
      console.warn("⚠️ SignalR closed, reconnecting...");
      await start();
    });

    start();

    return () => {
      console.log("🧹 Cleanup SignalR connection");
      connection.stop();
    };
  }, [account?.id]);

  useEffect(() => {
    if (!realtimeConn) return;

    const oldId = prevConversationId.current;
    const newId = conversation?.id;

    if (oldId && oldId !== newId) {
      const oldKey = `${RealtimeKeys.MessageRefresh}-${oldId}`;
      console.log("🧹 Unsubscribing old conversation:", oldKey);
      realtimeConn
        .invoke(RealtimeMethods.Remove, { key: oldKey })
        .catch((err) => console.error("❌ Failed to unsubscribe:", err));
    }

    if (newId) {
      const newKey = `${RealtimeKeys.MessageRefresh}-${newId}`;
      console.log("🔁 Subscribing to new conversation:", newKey);
      realtimeConn
        .invoke(RealtimeMethods.Subscribe, { key: newKey })
        .catch((err) => console.error("❌ Failed to subscribe:", err));
    }

    prevConversationId.current = newId;
  }, [conversation?.id, realtimeConn]);

  return realtimeConn;
};
