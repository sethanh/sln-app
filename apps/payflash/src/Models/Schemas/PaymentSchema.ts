import * as Yup from 'yup';

export const createPaymentSchema = Yup.object({
  accountNo: Yup.string().required('bank account is required'),
  binCode: Yup.string().required('bank name is required'),
  amount: Yup.number()
    .nullable()
    .typeError('amount must be a number')
    .min(0, 'amount must be at least 0'),
  accountName: Yup.string().nullable(),
  description: Yup.string().nullable(),
});
