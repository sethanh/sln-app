import { useHttpCommand } from "@my-monorepo/utils";

const appName = import.meta.env.VITE_APP_NAME;

export const useManagementHttpCommand = <TResponse>(
  props?: {
    onSuccess?: (data: TResponse) => void;
    onError?: (error: unknown) => void;
    onFinally?: () => void;
  }
) => {

  return useHttpCommand<TResponse>(appName, {
    ...props,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error(`[${appName}] HTTP error:`, error);
      const status = error?.status ?? error?.response?.status;
      if (status === 401) {
        console.warn("Token hết hạn hoặc không hợp lệ — clearing token...");
      }
      props?.onError?.(error);
    },
  });
};
