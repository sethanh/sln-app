import React from 'react';
import { GroupSidebar } from '@my-monorepo/ui'
import { paymentSidebarConstants } from '@my-monorepo/payflash/Constants';
import { ICPayments } from '@my-monorepo/payflash/Assets';


export const PaymentSidebar: React.FC = () => {

    return (
        <GroupSidebar
            label='Payment'
            sidebarItems={paymentSidebarConstants}
            Icon={<ICPayments.Wallet stroke='#22356F'/>}
            border
        />
    );
};
