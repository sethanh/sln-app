import { useHttpQuery } from "@my-monorepo/utils";
import { IRequestOptions } from "packages/utils/src/services/IRequestOptions";

const appName = import.meta.env.VITE_APP_NAME;

export const usePaymentHttpQuery = <TResponse>(
    options?: IRequestOptions,
    config?: {
        onSuccess?: (data: TResponse) => void;
        onError?: (error: unknown) => void;
        onFinally?: () => void;
    }
) => {
    return useHttpQuery<TResponse>(appName, options, config);
};