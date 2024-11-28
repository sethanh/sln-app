import React from 'react';
import { GroupSidebar } from '@my-monorepo/ui'
import { StrikethroughOutlined } from '@ant-design/icons';
import { paymentSidebarConstants } from '@my-monorepo/payflash/Constants';


export const PaymentSidebar: React.FC = () => {

    return (
        <GroupSidebar
            label='Payment'
            sidebarItems={paymentSidebarConstants}
            Icon={<StrikethroughOutlined />}
            border={true}
            defaultShowItem={true}
        />
    );
};
