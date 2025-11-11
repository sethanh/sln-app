import { AccountConnectionResponse, AccountConnectionSearchRequest, AccountConnectionSearchResponse, AccountResponse } from "@my-monorepo/payflash/Models";
import { Block, FormikForm, InputField } from "@my-monorepo/ui"
import { useEffect, useState } from "react";
import { urlConstant } from "../../Constants";
import { currentAccountAtom, usePaymentHttpCommand, usePaymentHttpQuery } from "../../Root";
import { useAtom } from "jotai";

export interface AddFriendFormProps {
    onSuccess?: () => void;
}

export const AddFriendForm : React.FC<AddFriendFormProps> = (props) => {
    const [initialValues, setInitialValues] = useState<AccountConnectionSearchRequest>({
        email: ''
    });

    const [currentAccount,] = useAtom(currentAccountAtom);

    const { data: searchedAccount, refetch: refetchAccount } = usePaymentHttpQuery<AccountConnectionSearchResponse>({
        url: urlConstant.account.accountUrl,
        method: "GET",
        queryParams: {
            email: initialValues.email,
            pageSize: 100,
            useCountTotal: true
        }
    });

    useEffect(() => {
        refetchAccount();
    }, [initialValues]);

    const { mutateAsync } = usePaymentHttpCommand<AccountConnectionResponse>();

    const handleSubmit = async (values: AccountConnectionSearchRequest) => {
        if (searchedAccount) {
            const requestedAccount = searchedAccount.items[0];

            await mutateAsync({
                url: urlConstant.connection.accountConnectionUrl,
                requestOptions: {
                    method: "POST",
                    body: {
                        accountRequestId: currentAccount?.id!,
                        accountAcceptId: requestedAccount.id
                    }
                }
            });

            if(props.onSuccess) {
                props.onSuccess();
            }
        }
    };

    return (
        <Block
            padding="1rem"
        >
            <FormikForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
            {
                (formik) => (
                    <InputField
                        fieldName="email"
                        label="Email"
                        placeholder="Enter email"
                        required
                        onChange={(value) => setInitialValues({email: value})}
                    />
                )
            }
            </FormikForm>
        </Block>
        
    )
}