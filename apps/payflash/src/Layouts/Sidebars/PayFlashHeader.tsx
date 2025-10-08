
import React from 'react';
import { PayFlashAccountProfile } from '.'
import './Sidebar.css'
import { FlexBox } from '@my-monorepo/ui';
import { BellOutlined } from '@ant-design/icons';


export const PayFlashHeader: React.FC = () => {
    return (
        <FlexBox justifyContent="space-between" alignItems="center">
            <PayFlashAccountProfile/>
             <BellOutlined />
        </FlexBox>
    );
};
