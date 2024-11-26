import { IRequestOptions } from "./IRequestOptions";
import {getToken} from '../store'

const apiFetch = async <T>(
    url: string,
    options: IRequestOptions = {},
    appName?: string
): Promise<T> => {
    const { method = 'GET', headers = {}, queryParams, routeParams, body } = options;

    // Replace route params in the URL
    if (routeParams) {
        Object.keys(routeParams).forEach((key) => {
            url = url.replace(`:${key}`, routeParams[key]);
        });
    }

    // Append query parameters to URL
    if (queryParams) {
        const queryString = new URLSearchParams(queryParams as any).toString();
        url += `?${queryString}`;
    }

    const token = getToken(appName)

    // Set default headers (like authorization)
    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Token được truyền vào đây
        ...headers, // Merge any additional headers
    };

    const response = await fetch(url, {
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
};

export {apiFetch}