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

export const PayFlashSidebar: React.FC = () => {
    return (
        <FlexBox direction="column" justifyContent="space-between" >
            <FlexBox direction="column" gap={2}>
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
