import { FC } from 'react';
import {RouteApp} from '@my-monorepo/ui'
import { ManagementContentItem, ManagementContentHeader } from '../Layouts';
import { ManagementContentBody } from '../Layouts/Contents/ManagementContentBody';
import { IRouteAppItem } from 'packages/ui/src/Routes/IRouteApp';

const routes = [
    {
        path :"/",
        element:   <ManagementContentItem/>
       
    },
    {
        path :"/task/management",
        element:   <ManagementContentBody/>
       
    },
    {
        path :"/task/all",
        element:   <ManagementContentHeader/>
    }
] as IRouteAppItem[]



export const ManagementRoute: FC= () => {
    return (
        <RouteApp
            routes={routes}
        />
    );
};
