import { urlConstant } from '@my-monorepo/payflash/Constants';
import { GetAllPaymentResponse } from '@my-monorepo/payflash/Models';
import { useGlobalDrawer, usePaymentHttpCommand, usePaymentHttpQuery } from '@my-monorepo/payflash/Root';
import { ButtonCommon, FlexBox, TableCommon, TextCommon } from '@my-monorepo/ui';
import { Button, Col, Row, TableColumnsType, Image } from 'antd';
import React from 'react';
import { PaymentResponse } from '@my-monorepo/payflash/Models';
import { PaymentForm } from '@my-monorepo/payflash/Forms';
import { ICSocial } from '@my-monorepo/payflash/Assets';
import { useGlobalModal } from '@my-monorepo/payflash/Root/Store/Modal';

const PaymentList: React.FC = () => {
    const { resetGlobalDrawerState, setGlobalDrawer } = useGlobalDrawer();
    const { setGlobalModal, resetGlobalModal  } = useGlobalModal();

    const { data: payments, isLoading, refetch } = usePaymentHttpQuery<GetAllPaymentResponse>({
        url: urlConstant.paymentQr.paymentQrUrl,
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

    const onRefetch = () => {
        resetGlobalDrawerState();
        refetch();
    }

    const  onHandleDeleteAsync = React.useCallback(
            async (id?: number) => {
               await deleteAsync({
                url: urlConstant.paymentQr.paymentQrDeleteUrl,
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

    const showModalPayment = () => {
        setGlobalDrawer({
            isOpen: true,
            titleTransCode: "Create Payment",
            content: (
                <PaymentForm 
                    onSuccess={onRefetch}
                />
            ),
        });
    };

    const showModalEditPayment = ( record : PaymentResponse) => {
        setGlobalDrawer({
            isOpen: true,
            titleTransCode: "Edit Payment",
            content: (
                <PaymentForm 
                    onSuccess={onRefetch}
                    initialValues={record}
                />
            ),
        });
    };


      const showModalDelete = React.useCallback((record:  PaymentResponse) => {
            setGlobalModal({
                content: (
                    <FlexBox direction='column'>
                        <TextCommon fontSize={18} fontWeight={600}>{`Remove your payment`} </TextCommon>
                        <TextCommon fontSize={14}>
                            {`Are you sure you want to remove`}
                            <TextCommon color='#101828' fontWeight={600}>
                                {` ${record.accountNo}?`}
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

    const columns: TableColumnsType<PaymentResponse> = [
        {
                    title: 'Bank account',
                    dataIndex: 'name',
                    key: 'name',
                    render: (_, record) => {
                        return (
                            <FlexBox direction='column' gap={2} alignItems='center'>
                                <TextCommon textAlign='center'>{record.accountNo}</TextCommon>
                                <TextCommon textAlign='center'>{record.accountName}</TextCommon>
                            </FlexBox>
                        );
                    },
                    width: 150,
                },
        {
            title: 'QR Code',
            dataIndex: 'id',
            key: 'id',
            render: (_, record) => {
                return (
                    <Image
                        width={"350px"}
                        src={`https://img.vietqr.io/image/${record.binCode}-${record.accountNo}-compact2.png?addInfo=${record.description}&accountName=${record.accountName}`}
                        preview={true}
                        style={{
                            borderRadius: 8,
                            boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                        }}
                        loading='lazy'
                    />
                );
            },
            width: 150,
        },
        {
            title: 'Actions',
            dataIndex: 'phone',
            key: 'phone',
            render: (_, record) => {
                return <FlexBox gap={6} padding={24}>
                    <ButtonCommon
                        icon={<ICSocial.Edit width={20} height={20} />}
                        className='app-button-hover'
                        tooltipTitle='Edit'
                        onClick={() => showModalEditPayment(record)}
                    />
                    <ButtonCommon
                        icon={<ICSocial.Trash width={20} height={20} />}
                        className='app-button-hover'
                        tooltipTitle='Remove'
                        onClick={() => showModalDelete(record)}
                    />
                </FlexBox>
            },
        },
    ];


    return (<Row gutter={[12, 12]}>
        <Col span={24}>
        <TextCommon fontSize={24} fontWeight={600}>
            Payment
        </TextCommon>
        </Col>
        <Col span={24}>
            <FlexBox justifyContent='center' alignItems='center' flex={1} width='100%'>
                <TableCommon
                    titleTableTransCode='Your Payment Account'
                    loading={isLoading || isPendingRemove}
                    columns={columns}
                    dataSource={payments?.items}
                    pageInfo={payments?.meta}
                    emptyOption={{
                        title: "Create contact",
                        description: "Please on click to create a contact!",
                        actionButton: (
                            <Button
                                onClick={showModalPayment}
                            >
                                Create now
                            </Button>
                        )
                    }}
                    style={{display: 'flex'}}
                />

            </FlexBox>
       
        </Col>
    </Row>
    );
};

export { PaymentList };
