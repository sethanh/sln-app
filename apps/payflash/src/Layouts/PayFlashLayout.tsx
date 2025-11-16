import React from 'react';
import { MainLayout } from '@my-monorepo/ui'
import { PayFlashSidebar } from './Sidebars'
import { ManagementContent } from './Contents'
import './Layout.css'
import { PayFlashHeader } from './Sidebars/PayFlashHeader';
import { ICPayments } from '../Assets';

export const PayFlashLayout: React.FC = () => {
    
    return (
        <MainLayout
            header={<PayFlashHeader/>}
            sidebar={<PayFlashSidebar />}
            content={<ManagementContent />}
            sidebarClassName={`pay-flash-sidebar `}
            contentClassName={`pay-flash-content `}
            headerClassName={`pay-flash-header`}
            iconMenu={<ICPayments.Menu />}
        />
    );
};
