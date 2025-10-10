import { useHttpCommand } from "@my-monorepo/utils";

export const useContactHttpCommand = <TResponse>(
  props?: {
    onSuccess?: (data: TResponse) => void;
    onError?: (error: unknown) => void;
    onFinally?: () => void;
  }
) => {

  return useHttpCommand<TResponse>("", props)
};
