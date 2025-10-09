
import React from 'react';
import { PayFlashAccountProfile } from '.'
import './Sidebar.css'
import { FlexBox } from '@my-monorepo/ui';
import { ICPayments } from '@my-monorepo/payflash/Assets';


export const PayFlashHeader: React.FC = () => {
    return (
        <FlexBox justifyContent="space-between" alignItems="center"  height="100%" >
            <PayFlashAccountProfile/>
            <ICPayments.Bell cursor='pointer' />
        </FlexBox>
    );
};
