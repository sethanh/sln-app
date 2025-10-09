import { FlexBox } from '@my-monorepo/ui';
import React from 'react';
import { DigitalBusinessCard } from './Components/DigitalBusinessCard';

const ContactPage: React.FC = () => {
    return (
        <FlexBox direction='column' gap={24} alignItems='center' padding={24} justifyContent='center'>
            <DigitalBusinessCard />
        </FlexBox>
    );
};

export { ContactPage }
