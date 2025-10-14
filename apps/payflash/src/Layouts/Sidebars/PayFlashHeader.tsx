
import React from 'react';
import { PayFlashAccountProfile } from '.'
import './Sidebar.css'
import { FlexBox } from '@my-monorepo/ui';
import { ICPayments } from '@my-monorepo/payflash/Assets';
import { Badge } from 'antd';


export const PayFlashHeader: React.FC = () => {
    return (
        <FlexBox justifyContent="space-between" alignItems="center"  height="100%" padding='0px 24px 0px 0px'>
            <PayFlashAccountProfile/>
            <Badge>
                <ICPayments.Bell cursor='pointer' />
            </Badge>
        </FlexBox>
    );
};
