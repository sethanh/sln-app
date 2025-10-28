import React from 'react';
import { qrCodeSidebarConstants } from '@my-monorepo/payflash/Constants';
import { SingleSidebar } from '@my-monorepo/ui';
const qrCodeSidebar = qrCodeSidebarConstants[0];

export const QrCodeSidebar: React.FC = () => {

    return (
        <SingleSidebar
            label='Qr Code'
            PreIcon={qrCodeSidebar.Icon}
            value={qrCodeSidebar.path}
            border={true}
        />
    );
};
