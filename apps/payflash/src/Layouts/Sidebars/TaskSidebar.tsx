import React from 'react';
import { taskSidebarConstants } from '@my-monorepo/payflash/Constants';
import { BarcodeOutlined } from '@ant-design/icons';
import { GroupSidebar } from '@my-monorepo/ui';

export const QrCodeSidebar: React.FC = () => {

    return (
        <GroupSidebar
            label='Qr Code'
            sidebarItems={taskSidebarConstants}
            Icon={<BarcodeOutlined />}
            defaultShowItem={true}
        />
    );
};
