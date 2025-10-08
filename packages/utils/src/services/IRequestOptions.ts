type IRequestOptions<
  TQuery extends object = object,
  TRoute extends object = object,
  TBody = any
> = {
  method?: string;
  headers?: Record<string, string>;
  queryParams?: TQuery;
  routeParams?: TRoute;
  body?: TBody;
  url?: string;
};

export type { IRequestOptions };