import { FC } from 'react';
import { ISidebarItemProps, RouteApp } from '@my-monorepo/ui'
import {
    paymentSidebarConstants,
    qrCodeSidebarConstants,
    teamSidebarConstants,
    taxSidebarConstants,
    documentSidebarConstants,
    mainRootConstants,
    homeConstants
} from '../Constants';

const contentRootRoutes: ISidebarItemProps[] = [
    ...paymentSidebarConstants,
    ...qrCodeSidebarConstants,
    ...teamSidebarConstants,
    ...documentSidebarConstants,
    ...taxSidebarConstants,
    ...homeConstants
];

const mainRootRoutes: ISidebarItemProps[] = [
    ...mainRootConstants.authConstants
];



export const ManagementContentRoute: FC = () => {
    return (
        <RouteApp
            routes={contentRootRoutes}
        />
    );
};

export const ManagementRootRoute: FC = () => {
    return (
        <RouteApp
            routes={mainRootRoutes}
        />
    );
};
