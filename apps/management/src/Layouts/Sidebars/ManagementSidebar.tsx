import React from 'react';
import { FinancialSidebar } from './FinancialSidebar'
import { TaskSidebar } from './TaskSidebar'
import { TeamSidebar }  from './TeamSidebar'
import { DocumentSidebar } from './DocumentSidebar'
import { ManagementAccountAction } from './ManagementAccountAction'
import { ManagementAccountProfile } from './ManagementAccountProfile'
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
