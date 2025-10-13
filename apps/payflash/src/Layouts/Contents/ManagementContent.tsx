import React from 'react';
import './Content.css'
import { ManagementContentRoute } from '@my-monorepo/payflash/Routes'
import { DrawerGlobal, ModalGlobal } from '@my-monorepo/payflash/Components';


export const ManagementContent: React.FC = () => {
    return (
        <div className='management-content-wrapper'>
            <ManagementContentRoute/>
            <DrawerGlobal/>
            <ModalGlobal/>
        </div>
    );
};
