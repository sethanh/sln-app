import React from 'react';
import { PaymentSidebar, 
        QrCodeSidebar, 
        TeamSidebar, 
        DocumentSidebar, 
        PayFlashAccountAction, 
        PayFlashAccountProfile } from '../Sidebars'
import './Sidebar.css'


export const PayFlashSidebar: React.FC = () => {
    return (
        <div className='management-sidebar-wrapper'>
            <div>
                <PayFlashAccountProfile />
                <PaymentSidebar />
                <QrCodeSidebar />
                <TeamSidebar />
                <DocumentSidebar />
            </div>
            <PayFlashAccountAction />
        </div>
    );
};
