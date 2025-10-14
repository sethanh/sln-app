import { currentAccountAtom } from '@my-monorepo/payflash/Root';
import { EmptyTable, FlexBox, TextCommon } from '@my-monorepo/ui';
import { Button, Col, Row } from 'antd';
import { useAtom } from 'jotai';
import React from 'react';
import { useNavigate } from 'react-router';
import { PaymentList } from './Components';

const PaymentPage: React.FC = () => {
    const [account] = useAtom(currentAccountAtom);
    const navigate = useNavigate();
    

    if (!account) {
            return (
                <Row gutter={[24, 24]} align="middle">
                    <Col span={24}>
                        <TextCommon fontSize={24} fontWeight={600}>
                            Payments
                        </TextCommon>
                    </Col>
                    <Col span={24} >
                        <EmptyTable
                            title="Create payment"
                            description={<FlexBox direction="column" alignItems="center" justifyContent="center">
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
        <PaymentList />
    );

};

export { PaymentPage }
