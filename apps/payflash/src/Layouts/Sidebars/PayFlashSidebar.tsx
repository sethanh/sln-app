import React from 'react';
import {
    PaymentSidebar,
    QrCodeSidebar,
    TeamSidebar,
    DocumentSidebar,
    PayFlashAccountAction,
} from '.'
import './Sidebar.css'
import { FlexBox } from '@my-monorepo/ui';
import { CardHolderSidebar } from './CardHolderSidebar';

export const PayFlashSidebar: React.FC = () => {
    return (
        <FlexBox direction="column" justifyContent="space-between" >
            <FlexBox direction="column" gap={2}>
                <CardHolderSidebar/>
                <PaymentSidebar />
                {/* <TaxSidebar/> */}
                <QrCodeSidebar />
                <TeamSidebar />
                <DocumentSidebar />
            </FlexBox >
            <PayFlashAccountAction />
        </FlexBox>
    );
};
