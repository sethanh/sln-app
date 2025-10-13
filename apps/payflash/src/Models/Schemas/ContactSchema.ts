import * as Yup from 'yup';

export const contactSchema = Yup.object({
  name: Yup.string().required('name is required'),
  photoId:  Yup.string().required('photo is required'),
  socialContacts: Yup.array().of(
    Yup.object().shape({
      socialType: Yup.string().required('Social type is required'),
    })
  ),
});
