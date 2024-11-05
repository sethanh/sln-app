type IRequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    queryParams?: Record<string, string | number>;
    routeParams?: Record<string, string>;
    body?: any;
};