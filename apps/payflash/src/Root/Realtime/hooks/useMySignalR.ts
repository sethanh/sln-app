
import { useAtom} from "jotai";
import { currentAccountAtom, currentConversation } from "../../Store";
import { useSignalRListener } from "@my-monorepo/utils";
import { RealtimeKeys } from "../keys";

export function usePaymentSignalR() {
  const [account] = useAtom(currentAccountAtom);
  const [conversation] = useAtom(currentConversation);

  useSignalRListener({
    hubUrl: import.meta.env.VITE_SIGNALR_URL,
    context: {
      accountId: account?.id,
      conversationId: conversation?.id
    },
    eventPatterns: RealtimeKeys,
    onlyWatchForDataChange: false, // nhận cả snapshot DataFetched lần đầu
    debug: false,
    onEvent: (resolvedKey, eventName, payload) => {
      // payload có thể là: item hoặc [items] tuỳ event
      // bạn có thể route theo key (NOTIFY-<accountId>) hoặc theo eventName
      console.log("[PaymentSignalR] key:", resolvedKey, "event:", eventName, "payload:", payload);

      // // ví dụ: bắn toast khi có DataAdded vào kênh NOTIFY
      // if (eventName === "DataAdded" || eventName === "ChildDataAdded") {
      //   // yourNotifyToast("Có thông báo thanh toán mới", payload);
      // }
    },
  });
}
