import { IRequestOptions } from "./IRequestOptions";
import { apiFetch } from "./apiFetch";

const handleApiFetch = async <T>(
    url: string,
    options: IRequestOptions,
    setLoading: (loading: boolean) => void,
    setError: (error: any | null) => void,
    appName?: string
): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
        const result = await apiFetch<T>(url, options, appName);
        return result;
    } catch (error) {
        setError(error);
        return null;
    } finally {
        setLoading(false);
    }
};


export { handleApiFetch }