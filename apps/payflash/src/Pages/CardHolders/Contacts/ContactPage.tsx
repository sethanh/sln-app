import { FlexBox } from '@my-monorepo/ui';
import React from 'react';
import { DigitalBusinessCard } from './Components/DigitalBusinessCard';
import { Card } from 'antd';
import './Components/DigitalBusinessCard.css'

const ContactPage: React.FC = () => {
    return (
        <FlexBox direction='column' gap={24} alignItems='center' padding={24} justifyContent='center'>
            <Card style={{ background: 'radial-gradient(circle at 30% 30%, #e3eaf9 0%, #cdd6ef 60%, #e6ecfa 100%)'}}>
                <div className="bg-blob"></div>
                <DigitalBusinessCard />
            </Card>
        </FlexBox>
    );
};

export { ContactPage }
