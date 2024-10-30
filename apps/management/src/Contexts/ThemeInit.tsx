import { contextInit } from '@my-monorepo/ui';

export function themeInit(initialValue: string) {
    const { context, context_use } = contextInit<string>(initialValue);
    return { context, context_use };
}
