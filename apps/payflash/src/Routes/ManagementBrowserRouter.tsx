import { BrowserRouterApp } from '@my-monorepo/ui'
import { PropsWithChildren } from 'react';

export const ManagementBrowserRouter: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <BrowserRouterApp>
            {children}
        </BrowserRouterApp>
    );
}