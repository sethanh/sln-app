import React from 'react';
import './Content.css'
import { ManagementContentRoute } from '@my-monorepo/payflash/Routes'


export const ManagementContent: React.FC = () => {
    return (
        <div className='management-content-wrapper'>
            <ManagementContentRoute/>
        </div>
    );
};
