
import { useAtom} from "jotai";
import { currentAccountAtom } from "../../Store";
import { useSignalRListener } from "@my-monorepo/utils";
import { RealtimeKeys } from "../keys";

export function usePaymentSignalR() {
  const [account] = useAtom(currentAccountAtom);

  useSignalRListener({
    hubUrl: import.meta.env.VITE_SIGNALR_URL,
    context: {
      accountId: account?.id,
    },
    eventPatterns: RealtimeKeys,
    onEvent: (eventKey, payload) => {
        console.log("Received event:", eventKey, payload);
    },
  });
}
