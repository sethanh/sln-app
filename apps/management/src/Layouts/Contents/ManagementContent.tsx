import React from 'react';
import {ManagementContentHeader} from './ManagementContentHeader'
import './Content.css'
import { ManagementContentBody } from './ManagementContentBody';


export const ManagementContent: React.FC = () => {
    return (
        <div className='management-content-wrapper'>
            <ManagementContentHeader/>
            <ManagementContentBody/>
        </div>
    );
};
