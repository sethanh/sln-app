import { appConstant, urlConstant } from '@my-monorepo/payflash/Constants';
import { contactSchema, AccountResponse, AccountUpdateRequest } from '@my-monorepo/payflash/Models';
import { currentAccountAtom, usePaymentHttpQuery } from '@my-monorepo/payflash/Root';
import { usePaymentHttpCommand } from '@my-monorepo/payflash/Root/Services/hooks/usePaymentHttpCommand';
import {
  AvatarField,
  FlexBox,
  FormikForm,
  InputField,
  TextCommon,
} from '@my-monorepo/ui';
import { getToken } from '@my-monorepo/utils';
import { Button, Card, Spin } from 'antd';
import { useAtom } from 'jotai';
import React, { useCallback } from 'react';

interface AccountFormProps {
  onSuccess?: () => void
}

const AccountForm: React.FC<AccountFormProps> = (props: AccountFormProps) => {
  const [currentAccount,] = useAtom(currentAccountAtom)

  const { data: account, isLoading } = usePaymentHttpQuery<AccountResponse>({
    url: urlConstant.account.getAccountDetail,
    method: "GET",
    routeParams: {
      id: currentAccount?.id || ''
    }
  }
  );

  const initialValues = {
    email: account?.googleAccounts?.[0].email || '',
    name: account?.name || '',
    password: account?.password || '',
    photoId: account?.photoId,
    id: account?.id || ''
  } as AccountUpdateRequest;

  const { isPending } = usePaymentHttpCommand<AccountUpdateRequest>({});

  const handleSubmit = async (values: AccountUpdateRequest) => {
    console.log('Submitting account update with values:', values);
    if (props.onSuccess) {
      props.onSuccess();
    }
  };

  const getTokenValue = useCallback((): string => {
    return getToken(appConstant.appName) || '';
  }, []);

  console.log(account);

  return (
    <FlexBox direction="column" padding={12} className='contact-form' >
      <Spin spinning={isLoading}>
        {account ? (<FormikForm
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
                    src={account?.photo?.relativePath || account?.googleAccounts?.[0]?.picture}
                  />
                  <InputField fieldName="name" label="Name" required />
                  <InputField fieldName="email" label="Email" disabled/>
                  <InputField fieldName="password" label="password"/>
                </FlexBox>
              </Card>
              <Button
                type="primary"
                htmlType="submit"
                disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                loading={isPending}
              >
                Update
              </Button>
            </FlexBox>
          )}
        </FormikForm>) : null}
      </Spin>
    </FlexBox>
  );
};

export { AccountForm };
