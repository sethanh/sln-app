import { handleApiFetch } from "@my-monorepo/utils";
import { IRequestOptions } from "packages/utils/src/services/IRequestOptions";
const appName = import.meta.env.VITE_APP_NAME;

export const paymentApiFetch = async <T>(
    url: string,
    options: IRequestOptions,
    setLoading: (loading: boolean) => void,
    setError: (error: any | null) => void
): Promise<T | null> => {
   return await handleApiFetch(url, options, setLoading, setError, appName)
};