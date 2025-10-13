import { appConstant, urlConstant } from '@my-monorepo/payflash/Constants';
import { ContactResponse, contactSchema, ContactRequestBody, SocialType } from '@my-monorepo/payflash/Models';
import { usePaymentHttpCommand } from '@my-monorepo/payflash/Root/Services/hooks/usePaymentHttpCommand';
import {
  AvatarField,
  FlexBox,
  FormikForm,
  InputField,
  SelectField,
  TextCommon,
} from '@my-monorepo/ui';
import { getToken } from '@my-monorepo/utils';
import { Button, Card } from 'antd';
import React, { useCallback } from 'react';
import { FieldArray } from 'formik';
import { PlusOutlined } from '@ant-design/icons';
import { ICSocial } from '@my-monorepo/payflash/Assets';
import './Contact.css'

interface ContactFormProps {
  initialValues?: ContactResponse,
  onSuccess?: () => void
}

const ContactForm: React.FC<ContactFormProps> = (props: ContactFormProps) => {
  const initialValues = {
    id: props.initialValues?.id || '',
    name:  props.initialValues?.name || '',
    job: props.initialValues?.job || '',
    phoneNumber: props.initialValues?.phoneNumber || '',
    email: props.initialValues?.email || '',
    photoId: props.initialValues?.photoId || '',
    socialContacts: props.initialValues?.socialContacts || [],
    profileName: props.initialValues?.profileName  
  } as ContactRequestBody;

  const { mutateAsync, isPending } = usePaymentHttpCommand<ContactRequestBody>({});

  const handleSubmit = async (values: ContactRequestBody) => {
    if (props.initialValues && props.initialValues.id) {
      await mutateAsync({
        url: urlConstant.contact.contactUpdateUrl,
        requestOptions: {
          method: 'PATCH',
          body: values,
          routeParams: { id: props.initialValues.id }
          },
      });
    };

    if (!props.initialValues) {
      await mutateAsync({
        url: urlConstant.contact.contactCreateUrl,
        requestOptions: {
          method: 'POST',
          body: values,
        },
      });
    }

    if (props.onSuccess) {
      props.onSuccess();
    }
  };

  const getTokenValue = useCallback((): string => {
    return getToken(appConstant.appName) || '';
  }, []);

  const socialTypeOptions = [
    { label: 'Facebook', value: SocialType.Facebook },
    { label: 'X', value: SocialType.X },
    { label: 'Github', value: SocialType.Github },
    { label: 'Instagram', value: SocialType.Instagram },
    { label: 'Spotify', value: SocialType.Spotify },
    { label: 'Tiktok', value: SocialType.Tiktok },
    { label: 'Youtube', value: SocialType.Youtube },
    { label: 'Linkedin', value: SocialType.Linkedin },
  ];

  return (
     <FlexBox direction="column" padding={12} className='contact-form' >
      <FormikForm
        initialValues={initialValues}
        validationSchema={contactSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <FlexBox direction="column" gap={6}>
            <TextCommon fontWeight={600}>General Info</TextCommon>
            <Card style={{ width: '100%' }}>
              <FlexBox direction="column" gap={12}>
                <AvatarField
                  fieldName="photoId"
                  token={getTokenValue()}
                  createPhotoUrl={urlConstant.photo.photoCreateUrl}
                  photoServer={appConstant.apiUrl}
                  src={props.initialValues?.photo?.relativePath}
                />
                <InputField fieldName="name" label="Name" required />
                <InputField fieldName="job" label="Job" />
                <FlexBox gap={14}>
                  <InputField fieldName="phoneNumber" label="Phone number" />
                  <InputField fieldName="email" label="Email" />
                </FlexBox>
                <InputField fieldName="profileName" label="Profile name" />
              </FlexBox>
            </Card>
            <TextCommon fontWeight={600}>Social contact</TextCommon>
            <Card>
              <FieldArray
                name="socialContacts"
                render={(arrayHelpers) => (
                  <FlexBox direction="column" gap={6}>
                    {formik.values.socialContacts &&
                      formik.values.socialContacts.map((_, index) => {
                        // Lấy danh sách các socialType đã chọn
                        const socialContacts = formik.values.socialContacts ?? [];
                        const selectedTypes = socialContacts
                            .filter(s => s.socialType !== undefined)
                            .map((sc) => sc.socialType as unknown as SocialType);

                        const filteredOptions = socialTypeOptions.filter(
                          (opt) =>
                            !selectedTypes.includes(opt.value) ||
                            opt.value === (socialContacts[index]?.socialType as unknown as SocialType)
                        );

                        return (
                          <FlexBox key={index} gap={8}>
                            <SelectField
                              fieldName={`socialContacts.${index}.socialType`}
                              options={filteredOptions}
                              placeholder="Select social type"
                            />
                            <InputField
                              fieldName={`socialContacts.${index}.link`}
                              placeholder="Enter link"
                            />
                            <Button
                              onClick={() => arrayHelpers.remove(index)}
                              icon={<ICSocial.Trash />}
                              style={{
                                display: 'flex',
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            />
                          </FlexBox>
                        );
                      })}
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => arrayHelpers.push({ socialType: '', link: '' })}
                    >
                      Add social
                    </Button>
                  </FlexBox>
                )}
              />
            </Card>

            <Button
              type="primary"
              htmlType="submit"
              disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
              loading={isPending}
            >
              {`${props.initialValues?.id ? 'Create' : 'Update'} Contact`} 
            </Button>
          </FlexBox>
        )}
      </FormikForm>
    </FlexBox>
  );
};

export { ContactForm };
