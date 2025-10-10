import { useHttpCommand } from "@my-monorepo/utils";
import { paymentToken, currentAccountAtom } from "@my-monorepo/payflash/Root";
import { useSetAtom } from "jotai";

const appName = import.meta.env.VITE_APP_NAME;

export const usePaymentHttpCommand = <TResponse>(
  props?: {
    onSuccess?: (data: TResponse) => void;
    onError?: (error: unknown) => void;
    onFinally?: () => void;
  }
) => {
  const setAccount = useSetAtom(currentAccountAtom);

  return useHttpCommand<TResponse>(appName, {
    ...props,
    onError: (error: any) => {
      console.error(`[${appName}] HTTP error:`, error);
      const status = error?.status ?? error?.response?.status;
      if (status === 401) {
        console.warn("Token hết hạn hoặc không hợp lệ — clearing token...");
        paymentToken.removePaymentToken();
        setAccount(null);
      }
      props?.onError?.(error);
    },
  });
};
