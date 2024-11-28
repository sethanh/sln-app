import React from 'react';
import { qrCodeSidebarConstants } from '@my-monorepo/payflash/Constants';
import { BarcodeOutlined } from '@ant-design/icons';
import { GroupSidebar } from '@my-monorepo/ui';

export const QrCodeSidebar: React.FC = () => {

    return (
        <GroupSidebar
            label='Qr Code'
            sidebarItems={qrCodeSidebarConstants}
            Icon={<BarcodeOutlined />}
            defaultShowItem={true}
        />
    );
};
