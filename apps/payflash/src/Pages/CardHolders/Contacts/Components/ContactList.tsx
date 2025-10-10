import { appConstant, urlConstant } from '@my-monorepo/payflash/Constants';
import { ContactForm } from '@my-monorepo/payflash/Forms';
import { ContactResponse, GetAllContactResponse } from '@my-monorepo/payflash/Models';
import { globalDrawerState, usePaymentHttpQuery } from '@my-monorepo/payflash/Root';
import { FlexBox, TableCommon, TextCommon } from '@my-monorepo/ui';
import { Avatar, Button, Col, Row, TableColumnsType } from 'antd';
import { useAtom } from 'jotai';
import React from 'react';

const ContactList: React.FC = () => {

    const { data: contacts, isLoading } = usePaymentHttpQuery<GetAllContactResponse>({
        url: urlConstant.contact.contactGetAll,
        method: "GET",
        queryParams: {
            pageSize: 200,
            useCountTotal: true
        }
    }
    );

    const [, setGlobalDrawer] = useAtom(globalDrawerState);

    const showModalEditSaleDetail = () => {
        setGlobalDrawer({
            isOpen: true,
            titleTransCode: "Create your contact",
            content: (
                <ContactForm />
            ),
        });
    };

    const columns: TableColumnsType<ContactResponse> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                return (
                    <FlexBox direction='column' gap={2}>
                        <Avatar src={`${appConstant.apiUrl}/${record.photo?.relativePath}`} />
                        <TextCommon>{record.name}</TextCommon>
                    </FlexBox>
                );
            },
            width: 150,
        },
        {
            title: 'Job',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (_, record) => {
                return (
                    <TextCommon>{record.job}</TextCommon>
                );
            }
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
            key: 'phone',
            render: (_, record) => {
                return <TextCommon>{record.phoneNumber}</TextCommon>
            },
        },
        {
            title: 'Link',
            dataIndex: 'phone',
            key: 'phone',
            render: (_, record) => {
                return <TextCommon>{record.id}</TextCommon>
            },
        },
        {
            title: 'Profile Name',
            dataIndex: 'phone',
            key: 'phone',
            render: (_, record) => {
                return <TextCommon>{record.id}</TextCommon>
            },
        },
    ];

    return (<Row gutter={[12, 12]}>
        <Col span={24}>
        <TextCommon fontSize={24} fontWeight={600}>
            Contact
        </TextCommon>
        </Col>
        <Col span={24}>
        <TableCommon
            titleTableTransCode='Your contacts'
            loading={isLoading}
            columns={columns}
            dataSource={contacts?.items}
            pageInfo={contacts?.meta}
            emptyOption={{
                title: "Create contact",
                description: "Please on click to create a contact!",
                actionButton: (
                    <Button
                        onClick={showModalEditSaleDetail}
                    >
                        Create now
                    </Button>
                )
            }}
            rightActionRender={ <Button
                onClick={showModalEditSaleDetail}>
                Create contact
                </Button>
            }
        />
        </Col>
    </Row>
    );
};

export { ContactList };
