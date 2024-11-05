import React from 'react';
import { ContextProvider } from '@my-monorepo/ui';
import { IcontextProvider } from 'packages/ui/src/Contexts/IContext';

export const ThemeContext = ({children, Context} : IcontextProvider<string>) => {
    return (
        <ContextProvider<string>
            Context={Context}
        >
            {children}
        </ContextProvider>
    )
}