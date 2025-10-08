import { useState, useEffect, useCallback, useRef } from "react";
import { IRequestOptions } from "../IRequestOptions";
import { handleApiFetch } from "../handleApiFetch";

interface UseHttpQueryConfig<TResponse> {
  onSuccess?: (data: TResponse) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
  autoFetch?: boolean; 
}

export const useHttpQuery = <TResponse>(
  appName?: string,
  options?: IRequestOptions,
  config?: UseHttpQueryConfig<TResponse>
) => {
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const hasFetched = useRef(false);

  const fetchData = useCallback(async () => {
    if (!options?.url) return;
    setIsLoading(true);
    setError(null);

    try {
      const result = await handleApiFetch<TResponse>(
        options.url,
        options,
        appName
      );
      setData({...result});
      config?.onSuccess?.(result);
    } catch (err) {
      setError(err);
      config?.onError?.(err);
    } finally {
      setIsLoading(false);
      config?.onFinally?.();
    }
  }, [appName, options?.url, JSON.stringify(options)]);

  useEffect(() => {
    if (config?.autoFetch === false) return;
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchData();
  }, [fetchData, config?.autoFetch]);

  return { data, isLoading, error, refetch: fetchData };
};