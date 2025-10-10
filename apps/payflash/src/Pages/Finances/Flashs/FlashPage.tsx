import { urlConstant } from '@my-monorepo/payflash/Constants';
import { BankInfoResponse, BankResponse, CreatePaymentQr, CreatePaymentQrResponse, createPaymentSchema } from '@my-monorepo/payflash/Models';
import { usePaymentHttpQuery } from '@my-monorepo/payflash/Root';
import { usePaymentHttpCommand } from '@my-monorepo/payflash/Root/Services/hooks/usePaymentHttpCommand';
import { FlexBox, formatterMoney, FormikForm, InputField, InputNumberField, SelectField, TextCommon } from '@my-monorepo/ui';
import { Button, Card, Col, Image, Row } from 'antd';
import React, { useMemo } from 'react';


interface BankOption {
    label: string;
    value: string;
}

const FlashPage: React.FC = () => {
    const initialValues: CreatePaymentQr = {
        accountNo: '',
        binCode: '',
        accountName: ''
    };

    // const handleSubmit = async (
    //     values: CreatePaymentQr
    // ) => {
    //     await paymentApiFetch<CreatePaymentQrResponse>(
    //         urlConstant.paymentQr.paymentQrCreateQr,
    //         {
    //             method: 'GET',
    //             queryParams: values, 
    //         }
    //     );
    // };

    const { data: banks, isLoading, } = usePaymentHttpQuery<BankResponse>({
        url: urlConstant.paymentQr.paymentQrBankUrl,
        method: "GET",
        queryParams: {
            pageSize: 200
        }
    }
    );

    const { mutateAsync, isPending, data } = usePaymentHttpCommand<CreatePaymentQrResponse>({});


    const handleSubmit = async (values: CreatePaymentQr) => {
        await mutateAsync({
            url: urlConstant.paymentQr.paymentQrCreateQr,
            requestOptions: {
                method: "GET",
                queryParams: values,
            },
        });
    };

    const options: BankOption[] = useMemo<BankOption[]>(
        () => {
            return banks?.items?.map((bank: BankInfoResponse) => ({
                label: `${bank.shortName} - ${bank.name}`,
                value: bank.bin || ''
            })) || []
        },
        [banks?.items]
    );

    return (
        <FlexBox direction='column' gap={24}>
            <TextCommon fontWeight={600} fontSize={22}>Flash payment QR</TextCommon>
            <Row gutter={[24, 24]}>
                <Col md={12} sm={24} xs={24}>
                    <Card style={{ width: '100%' }}>
                        <FormikForm
                            initialValues={initialValues}
                            validationSchema={createPaymentSchema}
                            onSubmit={handleSubmit}
                        >
                            {(formik) => (
                                <FlexBox direction='column' gap={12}>
                                    {
                                        banks && <SelectField
                                            fieldName="binCode"
                                            label="Bank name"
                                            options={options}
                                            optionFilterProp="label"
                                            required
                                            showSearch
                                        />
                                    }
                                    <InputField
                                        required
                                        fieldName="accountNo"
                                        label="Bank account"
                                    />
                                    <FlexBox gap={24}>
                                        <InputNumberField
                                            fieldName="amount"
                                            label="Amount"
                                            formatter={formatterMoney}
                                        />
                                        <InputField fieldName="description" label="Payment content " />
                                    </FlexBox>
                                    <InputField fieldName="accountName" label="Bank account name" />
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                                        loading={isPending || isLoading}
                                    >
                                        Create QR
                                    </Button>
                                </FlexBox>
                            )}
                        </FormikForm>
                    </Card>
                </Col>
                <Col md={12} sm={24} xs={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card
                        style={{
                            width: '50%',
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 16,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                            background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
                            border: "1px solid #f0f0f0",
                        }}
                    >
                        <FlexBox direction="column" alignItems="center" gap={4}>
                            {data && <Image
                                height="50%"
                                src={data.qrCode}
                                preview={true}
                                style={{
                                    borderRadius: 8,
                                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                                }}
                                loading='lazy'
                            />}
                            <TextCommon fontSize={16} fontWeight={500}>
                                {data ? 'Scan to pay' : 'No QR yet'}
                            </TextCommon>
                        </FlexBox>
                    </Card>
                </Col>
            </Row>
        </FlexBox>
    );
};

export { FlashPage }
