<<<<<<< HEAD
import React from 'react';
import { ContextProvider} from '@my-monorepo/ui';

export const ThemeContext = ({children, initialValue, Context} : { children?: React.ReactNode; initialValue: string, Context: React.Context<string>}) => {
    return (
        <ContextProvider<string>
            initialValue={initialValue}
=======
import { ContextProvider, IcontextProvider} from '@my-monorepo/ui';

export const ThemeContext = ({children, Context} : IcontextProvider<string>) => {
    return (
        <ContextProvider<string>
>>>>>>> master
            Context={Context}
        >
            {children}
        </ContextProvider>
    )
}