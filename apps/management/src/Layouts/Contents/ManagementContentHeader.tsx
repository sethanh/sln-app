import { BellOutlined } from '@ant-design/icons';
import React from 'react';


export const ManagementContentHeader: React.FC = () => {
    return (
        <div className='management-content-header-wrapper'>
            <div></div>
            <div className='management-content-header-icon'>
             <BellOutlined />
            </div>
        </div>
    );
};
