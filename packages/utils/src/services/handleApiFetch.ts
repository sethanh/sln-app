import { apiFetch } from "./apiFetch";

const handleApiFetch = async <T>(
    url: string,
    options: IRequestOptions,
    setLoading: (loading: boolean) => void,
    setError: (error: string | null) => void
): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
        const result = await apiFetch<T>(url, options);
        return result;
    } catch (error) {
        setError('Failed to fetch data');
        return null;
    } finally {
        setLoading(false);
    }
};


export { handleApiFetch}