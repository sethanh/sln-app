import { useHttpCommand } from "@my-monorepo/utils";

const appName = import.meta.env.VITE_APP_NAME;

export const usePaymentHttpCommand = <TResponse>(
  props?: {
    onSuccess?: (data: TResponse) => void;
    onError?: (error: unknown) => void;
    onFinally?: () => void;
  }
) => {
  return useHttpCommand<TResponse>(appName, props);
};