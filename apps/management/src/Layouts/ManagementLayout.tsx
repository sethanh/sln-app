import React from 'react';
import {MainLayout} from '@my-monorepo/ui'

export const ManagementLayout: React.FC = () => {
  return (
    <MainLayout
      header={<div>Project Management Dashboard</div>}
      sidebar={<div>Sidebar Links</div>}
      footer={<footer>Footer Content</footer>}
      content={<div>Main Content Goes Here</div>}
    />
  );
};