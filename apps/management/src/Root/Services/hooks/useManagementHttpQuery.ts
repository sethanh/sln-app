import { useHttpQuery } from "@my-monorepo/utils";
import { IRequestOptions } from "packages/utils/src/services/IRequestOptions";

const appName = import.meta.env.VITE_APP_NAME;

export const useManagementHttpQuery = <TResponse>(
  options?: IRequestOptions,
  config?: {
    onSuccess?: (data: TResponse) => void;
    onError?: (error: unknown) => void;
    onFinally?: () => void;
    autoFetch?: boolean;
  }
) => {

  return useHttpQuery<TResponse>(appName, options, {
    ...config,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error(`[${appName}] HTTP query error:`, error);

      const status = error?.status ?? error?.response?.status;
      if (status === 401) {
        console.warn("Token hết hạn hoặc không hợp lệ — clearing token...");
      }

      config?.onError?.(error);
    },
  });
};
