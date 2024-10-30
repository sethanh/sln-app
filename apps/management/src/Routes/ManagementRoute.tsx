import { FC } from 'react';
import {RouteApp} from '@my-monorepo/ui'
import { financialSidebarConstants, taskSidebarConstants } from '@my-monorepo/management';

export const ManagementRoute: FC= () => {
    return (
        <RouteApp
            routes={[...financialSidebarConstants, ...taskSidebarConstants]}
        />
    );
};
