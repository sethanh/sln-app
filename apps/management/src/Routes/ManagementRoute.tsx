import { FC } from 'react';
import {ISidebarItemProps, RouteApp} from '@my-monorepo/ui'
import { financialSidebarConstants, taskSidebarConstants } from '../Constants';

const mainRoots : ISidebarItemProps[] = [
    ...financialSidebarConstants, 
    ...taskSidebarConstants
];

export const ManagementRoute: FC= () => {
    return (
        <RouteApp
            routes={mainRoots}
        />
    );
};
