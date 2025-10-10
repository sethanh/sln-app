import { handleApiFetch } from "@my-monorepo/utils";
import { IRequestOptions } from "packages/utils/src/services/IRequestOptions";
const appName = import.meta.env.VITE_APP_NAME;

export const paymentApiFetch = async <
  TResponse,
  TQuery extends object = object,
  TRoute extends object = object,
  TBody = unknown
>(
  url: string,
  options: IRequestOptions<TQuery, TRoute, TBody>,
): Promise<TResponse | null> => {
  return await handleApiFetch<TResponse>(url, options, appName);
};