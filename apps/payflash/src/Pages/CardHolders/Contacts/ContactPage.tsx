import { FlexBox, TextCommon } from '@my-monorepo/ui';
import React from 'react';
import { DigitalBusinessCard } from './Components/DigitalBusinessCard';
import { useAtom } from 'jotai';
import { currentAccountAtom } from '@my-monorepo/payflash/Root';
import { Button } from 'antd';
import { useNavigate } from "react-router"

const ContactPage: React.FC = () => {
    const [account] = useAtom(currentAccountAtom);
    const navigate = useNavigate();
    
    if(!account)
    {
        return (
            <FlexBox direction='column' gap={24} alignItems='center' padding={24} justifyContent='center'>
                <TextCommon fontWeight={600} fontStyle='italic'>Please log in to create a contact!</TextCommon>
                <Button title='Login'/>
                <DigitalBusinessCard />
            </FlexBox>
        );
    }

    return (
        <FlexBox direction='column' gap={24} alignItems='center' padding={24} justifyContent='center' >
            <FlexBox direction='column' gap={12} flex='none'>
                <Button onClick={()=> { navigate('auth/login')}}>Login</Button>
                <TextCommon fontWeight={600} fontStyle='italic'>Please log in to create a contact!</TextCommon>
            </FlexBox>
            <DigitalBusinessCard  />
        </FlexBox>
    );
};

export { ContactPage }
