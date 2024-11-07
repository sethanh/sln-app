import React from 'react';
import './Content.css'
import { ManagementContentItem } from './ManagementContentItem';


export const ManagementContentBody: React.FC = () => {
    return (
        <div className='management-content-body'>
            <ManagementContentItem/>
            <ManagementContentItem/>
            <ManagementContentItem/>
            <ManagementContentItem/>
        </div>
    );
};
