import { FlexBox, EmptyTable, TextCommon } from '@my-monorepo/ui';
import React from 'react';
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
                <Col span={24}>
                    <TextCommon fontSize={24} fontWeight={600}>
                        Contacts
                    </TextCommon>
                </Col>
                <Col span={24} >
                    <EmptyTable
                        title="Create contact"
                        description={<FlexBox direction="column" alignItems="center" justifyContent="center">
                            <TextCommon>
                                View an <TextCommon
                                    textDecoration='underline'
                                    type='secondary'
                                    color='#1349dd'
                                    cursor='pointer'
                                    onClick={() => window.open('https://profile.digitalme.website', '_blank')}
                                >example</TextCommon> to see how it works.
                            </TextCommon>
                            <TextCommon
                             fontStyle="italic"
                            >
                                You are not logged in. Please log in to create a contact!
                            </TextCommon>
                        </FlexBox>
                        }
                        actionButton={(
                            <Button onClick={() => navigate('/auth/login')}>
                                Login
                            </Button>
                        )}
                    />
                </Col>
            </Row>
        );
    }

    return (
        <ContactList />
    );
};

export { ContactPage };
