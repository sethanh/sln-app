import * as Yup from 'yup';

export const contactSchema = Yup.object({
  name: Yup.string().required('name is required'),
});
