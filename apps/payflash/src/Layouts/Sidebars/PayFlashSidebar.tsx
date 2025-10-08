import React from 'react';
import { PaymentSidebar, 
        QrCodeSidebar, 
        TeamSidebar, 
        DocumentSidebar, 
        PayFlashAccountAction, 
        TaxSidebar
 } from '.'
import './Sidebar.css'


export const PayFlashSidebar: React.FC = () => {
    return (
        <div className='management-sidebar-wrapper'>
            <div>
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
