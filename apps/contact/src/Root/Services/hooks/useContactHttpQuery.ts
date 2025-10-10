import { useHttpQuery } from "@my-monorepo/utils";
import { IRequestOptions } from "packages/utils/src/services/IRequestOptions";


export const useContactHttpQuery = <TResponse>(
  options?: IRequestOptions,
  config?: {
    onSuccess?: (data: TResponse) => void;
    onError?: (error: unknown) => void;
    onFinally?: () => void;
  }
) => {

  return useHttpQuery<TResponse>("", options,config);
};
