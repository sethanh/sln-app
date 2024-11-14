import React from 'react';
import {SingleSidebar} from '@my-monorepo/ui'
import { teamSidebarConstants } from '@my-monorepo/payflash/Constants';
const  teamSidebar = teamSidebarConstants[0];


export const TeamSidebar: React.FC = () => {
    return (
        <SingleSidebar
            label={teamSidebar.label || ''}
            PreIcon={teamSidebar.Icon}
            value={teamSidebar.path}
       />
    );
};
