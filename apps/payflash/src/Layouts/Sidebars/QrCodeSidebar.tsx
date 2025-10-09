import React from 'react';
import { qrCodeSidebarConstants } from '@my-monorepo/payflash/Constants';
import { GroupSidebar } from '@my-monorepo/ui';
import { ICPayments } from '@my-monorepo/payflash/Assets';

export const QrCodeSidebar: React.FC = () => {

    return (
        <GroupSidebar
            label='Qr Code'
            sidebarItems={qrCodeSidebarConstants}
            Icon={<ICPayments.QrCode />}
            defaultShowItem={true}
        />
    );
};
