import { FC } from 'react';
import {RouteApp} from '@my-monorepo/ui'
import { financialSidebarConstants, taskSidebarConstants } from '../Constants';

export const ManagementRoute: FC= () => {
    return (
        <RouteApp
            routes={[...financialSidebarConstants, ...taskSidebarConstants]}
        />
    );
};
