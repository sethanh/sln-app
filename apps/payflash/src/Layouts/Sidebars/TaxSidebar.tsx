import React from 'react';
import { taxSidebarConstants } from '@my-monorepo/payflash/Constants';
import { ReconciliationOutlined } from '@ant-design/icons';
import { GroupSidebar } from '@my-monorepo/ui';

export const TaxSidebar: React.FC = () => {

    return (
        <GroupSidebar
            label='Tax Service'
            sidebarItems={taxSidebarConstants}
            Icon={<ReconciliationOutlined />}
            defaultShowItem={true}
        />
    );
};
