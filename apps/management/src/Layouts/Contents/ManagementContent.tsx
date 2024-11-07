import React from 'react';
import { ManagementContentHeader } from '@my-monorepo/management/layouts';
import './Content.css'
import { ManagementRoute } from '@my-monorepo/management/routes'


export const ManagementContent: React.FC = () => {
    return (
        <div className='management-content-wrapper'>
            <ManagementContentHeader />
            <ManagementRoute/>
        </div>
    );
};
