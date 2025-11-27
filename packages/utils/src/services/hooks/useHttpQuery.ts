import { useCallback, useEffect, useMemo } from "react";
import { IRequestOptions } from "../IRequestOptions";
import { handleApiFetch } from "../handleApiFetch";
import { useSmartQuery } from "../../query";

interface UseHttpQueryConfig<TResponse> {
  onSuccess?: (data: TResponse) => void;
  onError?: (error: unknown) => void;
  onFinally?: () => void;
  autoFetch?: boolean;
  staleTime?: number; // ms
}

export const useHttpQuery = <TResponse>(
  appName?: string,
  options?: IRequestOptions,
  config?: UseHttpQueryConfig<TResponse>
) => {
  const { autoFetch = true, staleTime = 0 } = config || {};

  const url = options?.url;
  const method = options?.method;

  const qpKey = useMemo(
    () => JSON.stringify(options?.queryParams ?? {}),
    [options?.queryParams]
  );

  const bodyKey = useMemo(
    () => JSON.stringify(options?.body ?? {}),
    [options?.body]
  );

  const headersKey = useMemo(
    () => JSON.stringify(options?.headers ?? {}),
    [options?.headers]
  );

  const queryKey = useMemo(
    () =>
      [
        "http",
        appName,
        url,
        method,
        qpKey,
        bodyKey,
        headersKey,
      ] as const,
    [appName, url, method, qpKey, bodyKey, headersKey]
  );

  const enabled = autoFetch && !!url;

  const queryFn = useCallback(async (): Promise<TResponse> => {
    if (!url) {
      throw new Error("Missing URL in useHttpQuery");
    }

    // dựng lại requestOptions từ các phần stable – tránh lệ thuộc vào cả object options
    const requestOptions: IRequestOptions = {
      ...(options || {}),
      url,
      method,
      queryParams: options?.queryParams,
      body: options?.body,
      headers: options?.headers,
    };

    const result = await handleApiFetch<TResponse>(url, requestOptions, appName);
    return result as TResponse;
  }, [
    appName,
    url,
    method,
    qpKey,      // đảm bảo đổi queryParams => tạo queryFn mới
    bodyKey,    // đổi body => queryFn mới
    headersKey, // đổi headers => queryFn mới
  ]);

  const {
    data,
    error,
    status,
    isLoading,
    isFetching,
    isStale,
    refetch,
  } = useSmartQuery<TResponse>({
    queryKey,
    queryFn,
    enabled,
    staleTime,
  });

  // callback onSuccess / onFinally
  useEffect(() => {
    if (status === "success" && data !== undefined && data !== null) {
      config?.onSuccess?.(data);
      config?.onFinally?.();
    }
  }, [status, data, config]);

  // callback onError / onFinally
  useEffect(() => {
    if (status === "error" && error) {
      config?.onError?.(error);
      config?.onFinally?.();
    }
  }, [status, error, config]);

  return {
    data: (data as TResponse | undefined) ?? null,
    error,
    isLoading,
    isFetching,
    isStale,
    refetch,
  };
};
