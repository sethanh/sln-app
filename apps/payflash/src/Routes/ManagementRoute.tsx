import { FC } from 'react';
import {ISidebarItemProps, RouteApp} from '@my-monorepo/ui'
import { 
    paymentSidebarConstants, 
    qrCodeSidebarConstants, 
    teamSidebarConstants,
    documentSidebarConstants
 } from '../Constants';

const mainRoots : ISidebarItemProps[] = [
    ...paymentSidebarConstants, 
    ...qrCodeSidebarConstants,
    ...teamSidebarConstants,
    ...documentSidebarConstants
];

export const ManagementRoute: FC= () => {
    return (
        <RouteApp
            routes={mainRoots}
        />
    );
};
