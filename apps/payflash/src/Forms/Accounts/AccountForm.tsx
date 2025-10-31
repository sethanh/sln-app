import { appConstant, urlConstant } from '@my-monorepo/payflash/Constants';
import { AccountModel, AccountResponse, AccountUpdateRequest, accountSchema } from '@my-monorepo/payflash/Models';
import { currentAccountAtom } from '@my-monorepo/payflash/Root';
import { usePaymentHttpCommand } from '@my-monorepo/payflash/Root/Services/hooks/usePaymentHttpCommand';
import {
  AvatarField,
  FlexBox,
  FormikForm,
  InputField,
  InputPasswordField,
  TextCommon,
} from '@my-monorepo/ui';
import { getToken } from '@my-monorepo/utils';
import { Card } from 'antd';
import { useAtom } from 'jotai';
import React, { useCallback } from 'react';

interface AccountFormProps {
  defaultValues?: AccountResponse
  onSuccess?: () => void
}

const AccountForm: React.FC<AccountFormProps> = (props: AccountFormProps) => {
  const [,setCurrentAccount] = useAtom(currentAccountAtom)
  const { defaultValues } = props;

  const initialValues = {
    email: defaultValues?.email || '',
    name: defaultValues?.name || '',
    password: defaultValues?.password || "********",
    photoId: defaultValues?.photoId,
    id: defaultValues?.id || '',
  } as AccountUpdateRequest;

  const { mutateAsync } = usePaymentHttpCommand<AccountResponse>({
    onSuccess(profile) {
      const initialSrc = profile.photo?.relativePath ? `${appConstant.apiUrl}/${profile.photo?.relativePath}`: profile?.googleAccounts?.[0].picture || '';
      setCurrentAccount({
        id: profile.id,
        name: profile.name,
        googleAccount: profile?.googleAccounts?.[0],
        picture: initialSrc
      } as AccountModel);
      if (props.onSuccess) {
        props.onSuccess();
      }
    },
  });

  const handleSubmit = async (values: AccountUpdateRequest) => {
    await mutateAsync({
      url: urlConstant.account.accountDetail,
      requestOptions: {
        method: 'PATCH',
        body: values,
        routeParams: { id: initialValues.id }
      },
    });
  };

  const getTokenValue = useCallback((): string => {
    return getToken(appConstant.appName) || '';
  }, []);

  return (
    <FlexBox direction="column" padding={12} className='contact-form' >
      <FormikForm
        initialValues={initialValues}
        validationSchema={accountSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <FlexBox direction="column" gap={6}>
            <TextCommon fontWeight={600}>General Info</TextCommon>
            <Card style={{ width: '100%' }}>
              <FlexBox direction="column" gap={12}>
                <AvatarField
                  fieldName="photoId"
                  token={getTokenValue()}
                  createPhotoUrl={urlConstant.photo.photoCreateUrl}
                  photoServer={appConstant.apiUrl}
                  src={defaultValues?.photo?.relativePath || defaultValues?.googleAccounts?.[0]?.picture}
                />
                <InputField fieldName="name" label="Name" required />
                <InputField fieldName="email" label="Email" disabled />
                <InputPasswordField fieldName="password" label="password" />
              </FlexBox>
            </Card>
          </FlexBox>
        )}
      </FormikForm>
    </FlexBox>
  );
};


export { AccountForm };
