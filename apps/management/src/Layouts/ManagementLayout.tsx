import React from 'react';
import { MainLayout } from '@my-monorepo/ui'
import { ManagementSidebar } from './Sidebars/ManagementSidebar'
import './Layout.css'

export const ManagementLayout: React.FC = () => {
  return (
    <MainLayout
      sidebar={<ManagementSidebar/>}
      content={<div>Main Content Goes Here</div>}
      sidebarClassName='management-sidebar'
    />
  );
};