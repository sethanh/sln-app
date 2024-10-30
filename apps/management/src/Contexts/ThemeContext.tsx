import React from 'react';
import { ContextProvider} from '@my-monorepo/ui';

export const ThemeContext = ({children, initialValue, Context} : { children?: React.ReactNode; initialValue: string, Context: React.Context<string>}) => {
    return (
        <ContextProvider<string>
            initialValue={initialValue}
            Context={Context}
        >
            {children}
        </ContextProvider>
    )
}