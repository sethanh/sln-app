import React from 'react';
import { ManagementContentHeader } from './ManagementContentHeader'
import './Content.css'
import { ManagementContentBody } from './ManagementContentBody';
import { Route, Routes } from 'react-router-dom';


export const ManagementContent: React.FC = () => {
    return (
        <div className='management-content-wrapper'>
            <ManagementContentHeader />
            <Routes>
                <Route path="/" element={<ManagementContentBody />} />
                <Route path="/financial/management" element={<ManagementContentHeader />} />
            </Routes>

        </div>
    );
};
