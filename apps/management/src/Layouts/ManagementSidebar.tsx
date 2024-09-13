import React from 'react';
import { FinancialSidebar } from './FinancialSidebar'
import { TaskSidebar } from './TaskSidebar'

export const ManagementSidebar: React.FC = () => {
    return (
        <>
            <FinancialSidebar />
            <TaskSidebar />
        </>
    );
};
