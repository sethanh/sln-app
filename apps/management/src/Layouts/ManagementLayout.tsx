import React from 'react';
import { MainLayout } from '@my-monorepo/ui'
import { ManagementSidebar } from './Sidebars/ManagementSidebar'
import { ManagementContent } from './Contents'
import './Layout.css'

export const ManagementLayout: React.FC = () => {
  return (
    <MainLayout
      sidebar={<ManagementSidebar/>}
      content={<ManagementContent/>}
      sidebarClassName='management-sidebar'
    />
  );
};