import React from 'react';
import { MainLayout } from '@my-monorepo/ui'
import { ManagementSidebar } from './ManagementSidebar'

export const ManagementLayout: React.FC = () => {
  return (
    <MainLayout
      header={<div>Project Management Dashboard</div>}
      sidebar={<ManagementSidebar/>}
      footer={<footer>Footer Content</footer>}
      content={<div>Main Content Goes Here</div>}
    />
  );
};