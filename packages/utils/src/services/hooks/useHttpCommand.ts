import { useCallback, useState } from "react";
import { handleApiFetch } from "../handleApiFetch";
import { IRequestOptions } from "../IRequestOptions";

/**
 * Custom hook giúp gọi API mutation (POST/PUT/DELETE...) mà không cần react-query
 */
export const useHttpCommand = <TResponse>(
  appName?: string,
  config?: {
    onSuccess?: (data: TResponse) => void;
    onError?: (error: unknown) => void;
    onFinally?: () => void;
  }
) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<TResponse | null>(null);

  const mutateAsync = useCallback(
    async (params: { url: string; requestOptions: IRequestOptions }) => {
      setIsPending(true);
      setError(null);

      try {
        const result = await handleApiFetch<TResponse>(
          params.url,
          params.requestOptions,
          appName
        );
        setData(result);
        config?.onSuccess?.(result);
        return result;
      } catch (err) {
        setError(err);
        config?.onError?.(err);
        throw err;
      } finally {
        setIsPending(false);
        config?.onFinally?.();
      }
    },
    [appName, config]
  );

  return { mutateAsync, isPending, error, data };
};
