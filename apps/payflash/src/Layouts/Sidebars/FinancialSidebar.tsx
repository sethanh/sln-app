import React from 'react';
import { GroupSidebar } from '@my-monorepo/ui'
import { StrikethroughOutlined } from '@ant-design/icons';
import { financialSidebarConstants } from '@my-monorepo/payflash/Constants';


export const PaymentSidebar: React.FC = () => {

    return (
        <GroupSidebar
            label='Payment'
            sidebarItems={financialSidebarConstants}
            Icon={<StrikethroughOutlined />}
            border={true}
            defaultShowItem={true}
        />
    );
};
