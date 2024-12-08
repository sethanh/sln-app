import { ContextProvider, IContextProvider } from '@my-monorepo/ui';

export interface accountModel {
    id: number
    name: string
}

export interface rootContext {
    account?: accountModel
}

export const ManagementRootContext = ({ children, Context }: IContextProvider<rootContext>) => {
    return (
        <ContextProvider<rootContext>
            Context={Context}
        >
            {children}
        </ContextProvider>
    )
}