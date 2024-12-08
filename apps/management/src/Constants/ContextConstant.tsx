import { contextInit } from "@my-monorepo/ui";
import { rootContext } from "..";

const ContextTheme = contextInit<string>("light");
const ContextRoot = contextInit<rootContext>({ account: undefined });
export { ContextRoot, ContextTheme }