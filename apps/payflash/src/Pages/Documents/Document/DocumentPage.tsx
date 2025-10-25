import React, { useEffect } from 'react';
import { ChatWindow } from './ChatWindow';
import { Card } from 'antd';
import { FlexBox, TextCommon } from '@my-monorepo/ui';
// import {apiFetch} from '@my-monorepo/utils'

const DocumentPage: React.FC = () => {
    useEffect(() => {
      }, []);

    return (
        <FlexBox direction='column' gap={12}>
            <TextCommon fontWeight={600} fontSize={24}>
                Message Room
            </TextCommon>
            <Card>
                <FlexBox gap={12}>
                    <ChatWindow />
                </FlexBox>
            </Card>
        </FlexBox>
       
    );
};

export { DocumentPage }
