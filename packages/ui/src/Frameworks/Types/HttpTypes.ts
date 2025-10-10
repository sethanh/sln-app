export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type HttpRequestPathData = Record<string, unknown>;
export type HttpRequestQuery = Record<string, unknown>;
export type HttpRequestBody = Record<string, unknown> | string | FormData;

export interface HttpRequestData {
    readonly contentType?: string;
    readonly pathData?: HttpRequestPathData;
    readonly query?: HttpRequestQuery;
    readonly body?: HttpRequestBody;
    readonly header?: Record<string, string>;
}

export interface HttpRequestValidation<TRequest, TResponse> {
    readonly request?: TRequest;
    readonly response?: TResponse;
    readonly successStatus?: number;
}

export interface HttpRequestMeta<TRequest = unknown, TResponse = unknown> {
    readonly baseUrl: () => string;
    readonly path: string;
    readonly method: HttpMethod;
    readonly authentication?: 'bearer' | 'basic';
    readonly validation?: HttpRequestValidation<TRequest, TResponse>;
}

export interface HttpRequest<TResponse, TRequest> {
    readonly meta: HttpRequestMeta;
    readonly send: (httpClient: IHttpClient, requestData?: TRequest) => Promise<TResponse>;
}

export type HttpRequestOptions = HttpRequestMeta & HttpRequestData;

export interface IHttpClient {
    send: <TResponse>(request: HttpRequestOptions) => Promise<TResponse>;
}

export interface PageInfo {
    readonly page: number;
    readonly pageCount: number;
    readonly pageSize: number;
    readonly totalItems: number;
}

export interface PaginationResponse<T> {
    readonly items: Array<T>;
    readonly meta: PageInfo;
}