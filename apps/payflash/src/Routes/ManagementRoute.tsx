import { FC } from 'react';
import { ISidebarItemProps, RouteApp } from '@my-monorepo/ui'
import {
    paymentSidebarConstants,
    qrCodeSidebarConstants,
    teamSidebarConstants,
    taxSidebarConstants,
    documentSidebarConstants,
    mainRootConstants,
    homeConstants,
    cardHolderConstants
} from '../Constants';

import { termConstants } from '../Constants/TermConstant';

const contentRootRoutes: ISidebarItemProps[] = [
    ...paymentSidebarConstants,
    ...qrCodeSidebarConstants,
    ...teamSidebarConstants,
    ...documentSidebarConstants,
    ...taxSidebarConstants,
    ...homeConstants,
    ...cardHolderConstants,
    ...termConstants
];

const mainRootRoutes: ISidebarItemProps[] = [
    ...mainRootConstants.authConstants,
    
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
