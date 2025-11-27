// packages/utils/src/query/queryCache.ts
export type QueryStatus = "idle" | "loading" | "success" | "error";

interface CacheEntry<TData = any> {
  data?: TData;
  error?: unknown;
  status: QueryStatus;
  updatedAt: number;
  listeners: Set<() => void>;
  promise?: Promise<TData> | null;
}

const cache = new Map<string, CacheEntry>();

const getOrCreateEntry = <TData = any>(key: string): CacheEntry<TData> => {
  let entry = cache.get(key) as CacheEntry<TData> | undefined;
  if (!entry) {
    entry = {
      data: undefined,
      error: undefined,
      status: "idle",
      updatedAt: 0,
      listeners: new Set(),
      promise: null,
    };
    cache.set(key, entry);
  }
  return entry;
};

export const subscribeQuery = (key: string, listener: () => void) => {
  const entry = getOrCreateEntry(key);
  entry.listeners.add(listener);

  return () => {
    entry.listeners.delete(listener);
  };
};

const notify = (key: string) => {
  const entry = cache.get(key);
  if (!entry) return;
  entry.listeners.forEach((l) => l());
};

export const getQueryState = <TData = any>(key: string) => {
  const entry = getOrCreateEntry<TData>(key);
  return {
    data: entry.data as TData | undefined,
    error: entry.error,
    status: entry.status,
    updatedAt: entry.updatedAt,
  };
};

interface FetchQueryOptions {
  staleTime?: number;
}

export const fetchQuery = async <TData = any>(
  key: string,
  queryFn: () => Promise<TData>,
  _options?: FetchQueryOptions
): Promise<TData> => {
  const entry = getOrCreateEntry<TData>(key);

  // dedupe: nếu đang có promise, dùng lại
  if (entry.promise) {
    return entry.promise;
  }

  const p = (async () => {
    try {
      entry.status = "loading";
      entry.error = undefined;
      notify(key);

      const data = await queryFn();

      // Luôn tạo reference mới để đảm bảo React rerender
      entry.data = data as TData;
      entry.status = "success";
      entry.updatedAt = Date.now();
      notify(key);

      return data;
    } catch (err) {
      entry.error = err;
      entry.status = "error";
      entry.updatedAt = Date.now();
      notify(key);
      throw err;
    } finally {
      entry.promise = null;
      notify(key);
    }
  })();

  entry.promise = p as Promise<any>;
  notify(key);

  return p;
};
