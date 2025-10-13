import React, { useLayoutEffect } from 'react';

import { currentAccountAtom, paymentToken } from './Store';
import { useAtom } from 'jotai';
import { usePaymentHttpCommand } from './Services';
import { AccountModel } from '../Models';
import { urlConstant } from '../Constants';

interface InitializerProps {
    readonly children: React.ReactNode;
}

export function Initializer(props: InitializerProps) {
    const { children } = props;
    const token = paymentToken.getPaymentToken()

    const [initialed, setInitialed] = React.useState(false);

    const [ ,setAccount] = useAtom(currentAccountAtom);
    const {mutateAsync} = usePaymentHttpCommand<AccountModel>({
    });


    const restoreLoginState = React.useCallback(async () => {
           async function fetchCurrentAccount() {
                    const resAccount = await mutateAsync(
                        {
                            url:  urlConstant.account.getCurrentAccountUrl,
                            requestOptions: {
                                method: 'GET'
                            }
                        }
                    );
        
                    if(resAccount)
                    {
                        return resAccount;
                    }

                    return null;
                }
                if (token != null) {
             return fetchCurrentAccount()
            }
            return null;

    }, [mutateAsync, token]);

    useLayoutEffect(
        () => {
            restoreLoginState()
                .then((savedLoginRes) => {
                    if (!savedLoginRes) {
                        paymentToken.removePaymentToken();
                    }

                    if(savedLoginRes) {
                        setAccount(savedLoginRes);
                    }
                })
                .then(() => {
                    setInitialed(true);
                })
                .catch(() => {
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token]
    );

    if (!initialed) {
        return null;
    }

    return children;
}