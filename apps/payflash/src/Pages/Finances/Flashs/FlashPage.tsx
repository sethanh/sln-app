import { CreatePayment, CreatePaymentResponse, createPaymentSchema } from '@my-monorepo/payflash/Models';
import { paymentApiFetch } from '@my-monorepo/payflash/Root';
import { FlexBox, FormikForm, InputField, TextCommon } from '@my-monorepo/ui';
import { Button } from 'antd';
import React from 'react';
const createPaymentUrl = '/api/payments/create';

function toQueryParams(obj: Record<string, unknown>): Record<string, string> {
  const params: Record<string, string> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params[key] = String(value);
    }
  });
  return params;
}

const FlashPage: React.FC = () => {
    const initialValues: CreatePayment = {
        accountNo: '',
        binCode: '',
        accountName: ''
    };

    const handleSubmit = async (
        values: CreatePayment
    ) => {

        const queryParams = toQueryParams(values as unknown as Record<string, unknown>);
        await paymentApiFetch<CreatePaymentResponse>(
            createPaymentUrl,
            {
                method: 'Get',
                queryParams: queryParams, // ✅ gửi qua query string
            },
            ()=> {},
            () => {}
        );
    };
    return (
        <FlexBox direction='column' flex={1} gap={24} alignItems='center'>
            <TextCommon fontWeight={600} fontSize={22}>Flash payment QR</TextCommon>
            <FlexBox>
                <FormikForm<CreatePayment>
                    initialValues={initialValues}
                    validationSchema={createPaymentSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => (
                        <>
                            <InputField fieldName="accountNo" label="Số tài khoản" />
                            <InputField fieldName="binCode" label="Mã BIN" />
                            <InputField fieldName="amount" label="Số tiền" />
                            <InputField fieldName="accountName" label="Tên tài khoản" />
                            <InputField fieldName="description" label="Mô tả" />

                            <div style={{ textAlign: 'right', marginTop: 16 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={formik.isSubmitting || !formik.isValid}
                                >
                                    Tạo thanh toán
                                </Button>
                            </div>
                        </>
                    )}
                </FormikForm>
            </FlexBox>
        </FlexBox>
    );
};

export { FlashPage }
