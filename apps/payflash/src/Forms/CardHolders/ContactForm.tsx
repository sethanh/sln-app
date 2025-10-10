import { appConstant, urlConstant } from '@my-monorepo/payflash/Constants';
import { contactSchema, CreateContact } from '@my-monorepo/payflash/Models';
import { usePaymentHttpCommand } from '@my-monorepo/payflash/Root/Services/hooks/usePaymentHttpCommand';
import { AvatarField, FlexBox, FormikForm, InputField, } from '@my-monorepo/ui';
import { getToken } from '@my-monorepo/utils';
import { Button, Card } from 'antd';
import React, { useCallback } from 'react';

const ContactForm: React.FC = () => {
    const initialValues: CreateContact = {
    };


    const { mutateAsync, isPending } = usePaymentHttpCommand<CreateContact>({});


    const handleSubmit = async (values: CreateContact) => {
        await mutateAsync({
            url: urlConstant.contact.contactCreateUrl,
            requestOptions: {
                method: "POST",
                body: values,
            },
        });
    };

    const getTokenValue = useCallback((): string => {
        return getToken(appConstant.appName) || '';
    }, []);

    return (
        <FlexBox direction='column' padding={12}>
            <FormikForm
                initialValues={initialValues}
                validationSchema={contactSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Card style={{ width: '100%' }}>
                        <FlexBox direction='column' gap={12}>
                            <AvatarField
                                fieldName='photoId'
                                token={getTokenValue()}
                                createPhotoUrl={urlConstant.photo.photoCreateUrl}
                                photoServer={appConstant.apiUrl}
                            />
                            <InputField
                                fieldName='name'
                                label='Name'
                                required
                            />
                            <InputField
                                fieldName='job'
                                label='Job'
                            />
                            <FlexBox gap={14}>
                                <InputField
                                    fieldName='phoneNumber'
                                    label='Phone Number'
                                />
                                <InputField
                                    fieldName='email'
                                    label='Email'
                                />
                            </FlexBox>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                                loading={isPending}
                            >
                                Create Contact
                            </Button>
                        </FlexBox>
                    </Card>
                )}
            </FormikForm>
        </FlexBox>
    );
};

export { ContactForm }
