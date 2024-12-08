import React from 'react';
import { MainLayout } from '@my-monorepo/ui'
import { PayFlashSidebar } from './Sidebars'
import { ManagementContent } from './Contents'
import './Layout.css'


export const ManagementLayout: React.FC = () => {
    

    return (
        <MainLayout
            sidebar={<PayFlashSidebar />}
            content={<ManagementContent />}
            sidebarClassName={`management-sidebar `}
            contentClassName={`management-content `}
        />
    );
};