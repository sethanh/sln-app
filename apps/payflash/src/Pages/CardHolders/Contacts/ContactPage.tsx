import { FlexBox, TableCommon, TextCommon } from '@my-monorepo/ui';
import React from 'react';
import { DigitalBusinessCard } from './Components/DigitalBusinessCard';
import { useAtom } from 'jotai';
import { currentAccountAtom } from '@my-monorepo/payflash/Root';
import { Button } from 'antd';
import { useNavigate } from 'react-router';

const ContactPage: React.FC = () => {
    const [account] = useAtom(currentAccountAtom);
    const navigate = useNavigate();

    if (!account) {
        return (
            <FlexBox
                direction="column"
                gap={24}
                alignItems="center"
                padding={24}
                justifyContent="center"
            >
                <FlexBox direction='column' flex='none' gap={12}>
                     <TextCommon fontWeight={600} fontStyle="italic">
                    You are not logged in. Please log in to create a contact!
                </TextCommon>
                <Button onClick={() => navigate('/auth/login')}>
                    Login
                </Button>
                </FlexBox>
               
                <DigitalBusinessCard />
            </FlexBox>
        );
    }

    return (
        <FlexBox
            direction="column"
            gap={24}
            alignItems="center"
            padding={24}
            justifyContent="center"
        >
            <TableCommon
                placeholderSearchTransCode='Search by client name'
            />
            <DigitalBusinessCard />
        </FlexBox>
    );
};

export { ContactPage };
