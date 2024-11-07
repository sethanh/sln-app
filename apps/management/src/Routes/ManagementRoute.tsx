import { FC } from 'react';
import {ISidebarItemProps, RouteApp} from '@my-monorepo/ui'
import { 
    financialSidebarConstants, 
    taskSidebarConstants, 
    teamSidebarConstants,
    documentSidebarConstants
 } from '@my-monorepo/management/Constants';

const mainRoots : ISidebarItemProps[] = [
    ...financialSidebarConstants, 
    ...taskSidebarConstants,
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
