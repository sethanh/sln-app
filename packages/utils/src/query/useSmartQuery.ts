// packages/utils/src/query/useSmartQuery.ts
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchQuery,
  getQueryState,
  subscribeQuery,
  QueryStatus,
} from "./queryCache";

export type QueryKey = readonly unknown[];

export interface UseSmartQueryOptions<TData> {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  enabled?: boolean;
  staleTime?: number;
}

interface UseSmartQueryResult<TData> {
  data: TData | undefined;
  error: unknown;
  status: QueryStatus;
  isLoading: boolean;
  isFetching: boolean;
  isStale: boolean;
  refetch: () => Promise<TData>;
}

export const useSmartQuery = <TData,>(
  options: UseSmartQueryOptions<TData>
): UseSmartQueryResult<TData> => {
  const { queryKey, queryFn, enabled = true, staleTime = 0 } = options;

  const key = useMemo(
    () => JSON.stringify(queryKey),
    // queryKey là array stable từ ngoài truyền vào
    [queryKey]
  );

  const [state, setState] = useState(() => {
    const queryState = getQueryState<TData>(key);
    const isStale =
      !queryState.data || Date.now() - queryState.updatedAt > staleTime;

    return {
      ...queryState,
      isStale,
      isFetching: queryState.status === "loading",
    };
  });

  const doFetch = useCallback(() => {
    if (!enabled) {
      return Promise.reject(
        new Error("Query is disabled (enabled === false)")
      ) as Promise<TData>;
    }
    return fetchQuery<TData>(key, queryFn, { staleTime });
  }, [enabled, key, queryFn, staleTime]);

  useEffect(() => {
    if (!enabled) return;

    const queryState = getQueryState<TData>(key);
    const isStale =
      !queryState.data || Date.now() - queryState.updatedAt > staleTime;

    if (isStale && queryState.status !== "loading") {
      // auto fetch nếu stale
      doFetch().catch(() => {
        // lỗi đã được lưu trong cache, không cần xử lý ở đây
      });
    }

    const unsubscribe = subscribeQuery(key, () => {
      const qs = getQueryState<TData>(key);
      const stale =
        !qs.data || Date.now() - qs.updatedAt > staleTime;

      setState({
        ...qs,
        isStale: stale,
        isFetching: qs.status === "loading",
      });
    });

    return unsubscribe;
  }, [key, staleTime, enabled, doFetch]);

  return {
    data: state.data,
    error: state.error,
    status: state.status,
    isLoading: state.status === "loading" && !state.data,
    isFetching: state.isFetching,
    isStale: state.isStale,
    refetch: doFetch,
  };
};
