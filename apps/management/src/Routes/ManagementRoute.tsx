import { FC } from 'react';
import {ISidebarItemProps, RouteApp} from '@my-monorepo/ui'
import { 
    financialSidebarConstants, 
    taskSidebarConstants, 
    teamSidebarConstants,
    documentSidebarConstants,
    authConstants,
    termConstants,

 } from '../Constants';

const mainRoots : ISidebarItemProps[] = [
    ...financialSidebarConstants, 
    ...taskSidebarConstants,
    ...teamSidebarConstants,
    ...documentSidebarConstants,
    ...authConstants,
    ...termConstants
];

export const ManagementRoute: FC= () => {
    return (
        <RouteApp
            routes={mainRoots}
        />
    );
};
