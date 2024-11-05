import { ContextProvider, IcontextProvider} from '@my-monorepo/ui';

export const ThemeContext = ({children, Context} : IcontextProvider<string>) => {
    return (
        <ContextProvider<string>
            Context={Context}
        >
            {children}
        </ContextProvider>
    )
}