import React from 'react';
import {QRCodeGenerator} from './Components'
import { FlexBox, TextCommon } from '@my-monorepo/ui';

const GeneratePage: React.FC = () => {
    return (
        <FlexBox direction='column' gap={24}>
            <TextCommon fontWeight={600} fontSize={24}>GeneratePage</TextCommon> 
            <QRCodeGenerator/>
        </FlexBox>
    );
};

export { GeneratePage }
