import React from 'react';
import { FinancialSidebar, 
        TaskSidebar, 
        TeamSidebar, 
        DocumentSidebar, 
        ManagementAccountAction, 
        ManagementAccountProfile } from '@my-monorepo/management/layouts'
import './Sidebar.css'


export const ManagementSidebar: React.FC = () => {
    return (
        <div className='management-sidebar-wrapper'>
            <div>
                <ManagementAccountProfile />
                <FinancialSidebar />
                <TaskSidebar />
                <TeamSidebar />
                <DocumentSidebar />
            </div>
            <ManagementAccountAction />
        </div>
    );
};
