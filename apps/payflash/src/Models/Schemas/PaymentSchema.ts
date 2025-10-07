import * as Yup from 'yup';

export const createPaymentSchema = Yup.object({
  accountNo: Yup.string().required('Số tài khoản là bắt buộc'),
  binCode: Yup.string().required('Mã BIN là bắt buộc'),
  amount: Yup.number()
    .nullable()
    .typeError('Số tiền không hợp lệ')
    .min(0, 'Số tiền phải >= 0'),
  accountName: Yup.string().nullable(),
  description: Yup.string().nullable(),
});
