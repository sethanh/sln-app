import * as Yup from 'yup';

export const accountSchema = Yup.object({
  name: Yup.string().required('name is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
