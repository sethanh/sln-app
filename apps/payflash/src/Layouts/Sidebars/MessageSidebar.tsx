import React from 'react';
import {GroupSidebar} from '@my-monorepo/ui'
import {messageSidebarConstants} from  '@my-monorepo/payflash/Constants'
import { ICPayments } from '@my-monorepo/payflash/Assets';

export const MessageSidebar: React.FC = () => {
    return (
        <GroupSidebar
            label='Chat message'
            sidebarItems={messageSidebarConstants}
            Icon={<ICPayments.Message stroke='#22356F'/>}
            defaultShowItem={true}
            border
        />
    );
};
