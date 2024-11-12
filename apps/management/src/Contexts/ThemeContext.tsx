import { ContextProvider, IContextProvider} from '@my-monorepo/ui';

export const ThemeContext = ({children, Context} : IContextProvider<string>) => {
    return (
        <ContextProvider<string>
            Context={Context}
        >
            {children}
        </ContextProvider>
    )
}