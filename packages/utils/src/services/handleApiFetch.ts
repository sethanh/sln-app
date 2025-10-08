import { IRequestOptions } from "./IRequestOptions.js";
import { apiFetch } from "./apiFetch.js";

const handleApiFetch = async <T>(
    url: string,
    options: IRequestOptions,
    // setLoading?: (loading: boolean) => void,
    // setError?: (error: any | null) => void,
    appName?: string
): Promise<T | null> => {
    // setLoading && setLoading(true);
    // setError && setError(null);
    try {
        const result = await apiFetch<T>(url, options, appName);
        return result;
    } catch (error) {
        // setError && setError(error);
        return null;
    } finally {
        // setLoading && setLoading(false);
    }
};


export { handleApiFetch }