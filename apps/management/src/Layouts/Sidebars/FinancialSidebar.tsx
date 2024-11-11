import React from 'react';
import { GroupSidebar } from '@my-monorepo/ui'
import { FundProjectionScreenOutlined } from '@ant-design/icons';
import { financialSidebarConstants } from '@my-monorepo/management/Constants';


export const FinancialSidebar: React.FC = () => {

    return (
            <GroupSidebar 
            label='Financial'
            sidebarItems={financialSidebarConstants}
            Icon={<FundProjectionScreenOutlined />}
            border={true}
            defaultShowItem={true}
            />
    );
};
