import React from 'react';
import { MainLayout } from '@my-monorepo/ui'
import { ManagementSidebar } from './Sidebars'
import { ManagementContent } from './Contents'
import './Layout.css'
import { TestContext, TestContextProvider } from '@my-monorepo/management/Contexts';

export const ManagementLayout: React.FC = () => {
    return (
        <TestContextProvider
            Context={TestContext}>
            <MainLayout
                sidebar={<ManagementSidebar/>}
                content={<ManagementContent/>}
                sidebarClassName={`management-sidebar`}
                contentClassName={`management-content`}
            />
        </TestContextProvider>
  );
};


