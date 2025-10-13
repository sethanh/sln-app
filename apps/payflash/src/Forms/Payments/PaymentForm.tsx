import { urlConstant } from '@my-monorepo/payflash/Constants';
import { BankInfoResponse, BankResponse, paymentBodySchema, PaymentRequestBody, PaymentResponse } from '@my-monorepo/payflash/Models';
import { usePaymentHttpQuery } from '@my-monorepo/payflash/Root';
import { usePaymentHttpCommand } from '@my-monorepo/payflash/Root/Services/hooks/usePaymentHttpCommand';
import { FlexBox, FormikForm, InputField, SelectField, TextCommon } from '@my-monorepo/ui';
import { Button, Card } from 'antd';
import React, { useMemo } from 'react';


interface BankOption {
    label: string;
    value: string;
}
interface PaymentProps {
    onSuccess?: () => void;
    initialValues?: PaymentResponse;
}

const PaymentForm: React.FC<PaymentProps> = (props: PaymentProps) => {
    
    const initialValues: PaymentRequestBody = {
       id: props.initialValues?.id,
       accountNo: props.initialValues?.accountNo || '',
       binCode: props.initialValues?.binCode || '',
       accountName: props.initialValues?.accountName || '',
       description: props.initialValues?.description || '',
    };

    const { data: banks, isLoading, } = usePaymentHttpQuery<BankResponse>({
        url: urlConstant.paymentQr.paymentQrBankUrl,
        method: "GET",
        queryParams: {
            pageSize: 200
        }
    }
    );

    const { mutateAsync, isPending } = usePaymentHttpCommand<PaymentResponse>({
        onSuccess: () => {
            if (props.onSuccess) {
                props.onSuccess();
            }
        }
    });

    const handleSubmit = async (values: PaymentRequestBody) => {
        if (props.initialValues && props.initialValues.id) {
            await mutateAsync({
                url: urlConstant.paymentQr.paymentQrUpdateUrl,
                requestOptions: {
                    method: 'PATCH',
                    routeParams: { id: props.initialValues.id },
                    body: values,
                },
            });
        }

        if (!props.initialValues?.id) {
            await mutateAsync({
                url: urlConstant.paymentQr.paymentQrUrl,
                requestOptions: {
                    method: "POST",
                    body: values,
                },
            });
        }
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
        <FlexBox direction='column' width={'33vw'} padding={24}>
            <FormikForm
                initialValues={initialValues}
                validationSchema={paymentBodySchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <FlexBox direction='column' gap={8}>
                    <TextCommon fontWeight={600}>General Info</TextCommon>
                    <Card style={{ width: '100%' }}>
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
                           
                            <FlexBox gap={24}>
                                <InputField
                                required
                                fieldName="accountNo"
                                label="Bank account"
                                />
                                <InputField fieldName="accountName" label="Bank account name" />
                            </FlexBox>
                            <InputField fieldName="description" label="Payment content " />
                        </FlexBox>
                    </Card>
                     <Button
                        type="primary"
                        htmlType="submit"
                        disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                        loading={isPending || isLoading}
                    >
                                {props.initialValues?.id ? 'Update' : 'Create'}
                            </Button>
                    </FlexBox>
                )}
            </FormikForm>

        </FlexBox>
    );
};

export { PaymentForm }
