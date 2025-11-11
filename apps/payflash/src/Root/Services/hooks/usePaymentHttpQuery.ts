import { useHttpQuery } from "@my-monorepo/utils";
import { IRequestOptions } from "packages/utils/src/services/IRequestOptions";
import { paymentToken, currentAccountAtom } from "@my-monorepo/payflash/Root";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router";

const appName = import.meta.env.VITE_APP_NAME;

export const usePaymentHttpQuery = <TResponse>(
  options?: IRequestOptions,
  config?: {
    onSuccess?: (data: TResponse) => void;
    onError?: (error: unknown) => void;
    onFinally?: () => void;
    autoFetch?: boolean;
  }
) => {
  const setAccount = useSetAtom(currentAccountAtom);
  const navigate = useNavigate();

  return useHttpQuery<TResponse>(appName, options, {
    ...config,
    onError: (error: any) => {
      console.error(`[${appName}] HTTP query error:`, error);

      const status = error?.status ?? error?.response?.status;
      if (status === 401) {
        console.warn("Token hết hạn hoặc không hợp lệ — clearing token...");
        paymentToken.removePaymentToken();
        setAccount(null);
        navigate("/auth/login");
      }

      config?.onError?.(error);
    },
  });
};
