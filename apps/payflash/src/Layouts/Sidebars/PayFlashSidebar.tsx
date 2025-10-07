import React from 'react';
import { PaymentSidebar, 
        QrCodeSidebar, 
        TeamSidebar, 
        DocumentSidebar, 
        PayFlashAccountAction, 
        PayFlashAccountProfile,
        TaxSidebar
 } from '.'
import './Sidebar.css'


export const PayFlashSidebar: React.FC = () => {
    return (
        <div className='management-sidebar-wrapper'>
            <div>
                <PayFlashAccountProfile />
                <PaymentSidebar />
                <TaxSidebar/>
                <QrCodeSidebar />
                <TeamSidebar />
                <DocumentSidebar />
            </div>
            <PayFlashAccountAction />
        </div>
    );
};
