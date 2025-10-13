import { ICSocial } from '@my-monorepo/payflash/Assets';
import { appConstant, urlConstant } from '@my-monorepo/payflash/Constants';
import { ContactForm } from '@my-monorepo/payflash/Forms';
import { ContactResponse, GetAllContactResponse } from '@my-monorepo/payflash/Models';
import { useGlobalDrawer, usePaymentHttpCommand, usePaymentHttpQuery } from '@my-monorepo/payflash/Root';
import { useGlobalModal } from '@my-monorepo/payflash/Root/Store/Modal';
import { ButtonCommon, FlexBox, TableCommon, TextCommon } from '@my-monorepo/ui';
import { Avatar, Button, Col, Row, TableColumnsType } from 'antd';
import React from 'react';

const ContactList: React.FC = () => {
    const { resetGlobalDrawerState, setGlobalDrawer } = useGlobalDrawer();
    const { setGlobalModal, resetGlobalModal  } = useGlobalModal();

    const { data: contacts, isLoading, refetch } = usePaymentHttpQuery<GetAllContactResponse>({
        url: urlConstant.contact.contactGetAll,
        method: "GET",
        queryParams: {
            pageSize: 200,
            useCountTotal: true
        }
    }
    );

    const { mutateAsync: deleteAsync, isPending: isPendingRemove } = usePaymentHttpCommand<void>({
        onSuccess: () => {
            resetGlobalModal();
            refetch();
        },
        onError: (error) => {
            console.error("Failed to delete contact", error);
        },
    });

    const  onHandleDeleteAsync = React.useCallback(
        async (id?: number) => {
           await deleteAsync({
            url: urlConstant.contact.contactDeleteUrl,
            requestOptions: {
                method: "DELETE",
                routeParams: { id },
                body: {
                    id: id
                }
            },
        });
        },
        [deleteAsync]
    );

    const onRefetch = () => {
        resetGlobalDrawerState();
        refetch();
    }

    const showModalCreateContact = () => {
        setGlobalDrawer({
            isOpen: true,
            titleTransCode: "Create your contact",
            content: (
                <ContactForm 
                    onSuccess={onRefetch}
                />
            ),
        });
    };

    const showModalEditContact= (record: ContactResponse) => {
        setGlobalDrawer({
            isOpen: true,
            titleTransCode: "Edit your contact",
            content: (
                <ContactForm 
                    initialValues={record}
                    onSuccess={onRefetch}
                />
            ),
        });
    };

    const showModalDelete = React.useCallback((record:  ContactResponse) => {
        setGlobalModal({
            content: (
                <FlexBox direction='column'>
                    <TextCommon fontSize={18} fontWeight={600}>{`Remove your contact`} </TextCommon>
                    <TextCommon fontSize={14}>
                        {`Are you sure you want to remove`}
                        <TextCommon color='#101828' fontWeight={600}>
                            {` ${record.name}?`}
                        </TextCommon>
                    </TextCommon>
                </FlexBox>
            ),
            isOpen: true,
            onOk: () => {
                onHandleDeleteAsync(record.id);
            },
            showModalDelete: true,
        });
    }, [onHandleDeleteAsync, setGlobalModal]);

    const columns: TableColumnsType<ContactResponse> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                return (
                    <FlexBox direction='column' gap={2} alignItems='center'>
                        <Avatar src={`${appConstant.apiUrl}/${record.photo?.relativePath}`} />
                        <TextCommon textAlign='center'>{record.name}</TextCommon>
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
                return <TextCommon   
                    cursor='pointer'
                    textDecoration='underline'
                    color='#1349dd' 
                    onClick={() => window.open(`https://${record.profileName||'empty'}.digitalme.website`, '_blank')}
                >
                    {`https://${record.profileName||'empty'}.digitalme.website`}
                </TextCommon>
            },
        },
        {
            title: 'Profile Name',
            dataIndex: 'phone',
            key: 'phone',
            render: (_, record) => {
                return <TextCommon>{record.profileName}</TextCommon>
            },
        },
        {
            title: 'Actions',
            dataIndex: 'phone',
            key: 'phone',
            render: (_, record) => {
                return <FlexBox gap={6}>
                    <ButtonCommon 
                        icon={<ICSocial.Edit  width={20} height={20}/>} 
                        className='app-button-hover'
                        tooltipTitle='Edit'
                        onClick={() => showModalEditContact(record)}
                    />
                    <ButtonCommon 
                        icon={<ICSocial.Trash width={20} height={20}/>}
                        className='app-button-hover'
                        tooltipTitle='Remove'
                        onClick={()=> showModalDelete(record)}
                    />
                </FlexBox>
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
            loading={isLoading || isPendingRemove}
            columns={columns}
            dataSource={contacts?.items}
            pageInfo={contacts?.meta}
            emptyOption={{
                title: "Create contact",
                description: "Please on click to create a contact!",
                actionButton: (
                    <Button
                        onClick={showModalCreateContact}
                    >
                        Create now
                    </Button>
                )
            }}
            rightActionRender={ <Button
                onClick={showModalCreateContact}>
                Create contact
                </Button>
            }
        />
        </Col>
    </Row>
    );
};

export { ContactList };
