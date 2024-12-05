import { ContextProvider, IContextInit, IContextProvider } from '@my-monorepo/ui';
import { createContext } from 'react';

export const TestContext = createContext<IContextInit<string>>({value: "light", setValue: () => {}});

export const TestContextProvider = ({ children, Context } : IContextProvider<string>) => {
    return (
        <ContextProvider<string>
            Context={Context}
        >
            {children}
        </ContextProvider>
    )
}

