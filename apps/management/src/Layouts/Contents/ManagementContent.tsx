import React from 'react';
import { ManagementContentHeader } from './ManagementContentHeader'
import './Content.css'
import { ManagementRoute } from '../../Routes'


export const ManagementContent: React.FC = () => {
    return (
        <div className='management-content-wrapper'>
            <ManagementContentHeader />
            <ManagementRoute/>
        </div>
    );
};
