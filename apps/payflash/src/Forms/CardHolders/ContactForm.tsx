import { appConstant, urlConstant } from '@my-monorepo/payflash/Constants';
import { contactSchema, CreateContact, SocialType } from '@my-monorepo/payflash/Models';
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

const ContactForm: React.FC = () => {
  const initialValues: CreateContact = {
    name: '',
    job: '',
    PhoneNumber: '',
    email: '',
    photoId: '',
    socialContacts: [],
  };

  const { mutateAsync, isPending } = usePaymentHttpCommand<CreateContact>({});

  const handleSubmit = async (values: CreateContact) => {
    await mutateAsync({
      url: urlConstant.contact.contactCreateUrl,
      requestOptions: {
        method: 'POST',
        body: values,
      },
    });
  };

  const getTokenValue = useCallback((): string => {
    return getToken(appConstant.appName) || '';
  }, []);

  const sosialTypeOptions = [
    { label: 'Facebook', value: SocialType.Facebook },
    { label: 'X', value: SocialType.X },
    { label: 'Github', value: SocialType.Github },
    { label: 'Instagram', value: SocialType.Instagram },
    { label: 'Spotify', value: SocialType.Spotify },
    { label: 'Tiktok', value: SocialType.Tiktok },
    { label: 'Youtube', value: SocialType.Youtube },
  ];

  return (
    <FlexBox direction="column" padding={12} width="70vh">
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
                            .map((sc) => sc.socialType as unknown as SocialType)
                            .filter(Boolean);

                        const filteredOptions = sosialTypeOptions.filter(
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
              Create Contact
            </Button>
          </FlexBox>
        )}
      </FormikForm>
    </FlexBox>
  );
};

export { ContactForm };
