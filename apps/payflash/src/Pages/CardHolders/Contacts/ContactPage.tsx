import { FlexBox, EmptyTable } from '@my-monorepo/ui';
import React from 'react';
import { DigitalBusinessCard } from './Components/DigitalBusinessCard';
import { useAtom } from 'jotai';
import { currentAccountAtom } from '@my-monorepo/payflash/Root';
import { Button, Col, Row } from 'antd';
import { useNavigate } from 'react-router';
import { ContactList } from './Components/ContactList';

const ContactPage: React.FC = () => {
    const [account] = useAtom(currentAccountAtom);
    const navigate = useNavigate();

    if (!account) {
        return (
            <Row gutter={[24, 24]} align="middle">
                <Col md={12} sm={24}>
                    <FlexBox direction="column"
                        alignItems="center"
                        justifyContent="center">
                        <DigitalBusinessCard />
                    </FlexBox>

                </Col>
                <Col md={12} sm={24}>
                    <EmptyTable
                        title="Create contact"
                        description="You are not logged in. Please log in to create a contact!"
                        actionButton={(
                            <Button onClick={() => navigate('/auth/login')}>
                                Login
                            </Button>
                        )}
                    />
                </Col>
                {/* <Col md={16} sm={24}>
                    <EmptyTable
                        title="Create contact"
                        description="You are not logged in. Please log in to create a contact!"
                        actionButton={(
                            <Button onClick={() => navigate('/auth/login')}>
                                Login
                            </Button>
                        )}
                    />
                </Col> */}
            </Row>
        );
    }

    return (
        <ContactList />
    );
};

export { ContactPage };
