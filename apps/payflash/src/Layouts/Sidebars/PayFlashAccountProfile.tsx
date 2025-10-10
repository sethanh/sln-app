import React, { useEffect } from 'react';
import { AccountProfile } from '@my-monorepo/ui'
import { useNavigate } from "react-router"
import { useAtom } from 'jotai';
import { urlConstant } from '@my-monorepo/payflash/Constants';

import { paymentToken, usePaymentHttpCommand } from '@my-monorepo/payflash/Root';
import { currentAccountAtom } from '@my-monorepo/payflash/Root';
import { AccountModel } from '@my-monorepo/payflash/Models';
import { ICPayments } from '@my-monorepo/payflash/Assets';

export const PayFlashAccountProfile: React.FC = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useAtom(currentAccountAtom)
    const token = paymentToken.getPaymentToken()
    const {mutateAsync} = usePaymentHttpCommand<AccountModel>({
        onError: (error: any) => {
            console.error('Error fetching current account:', error);
            setAccount(null)
        }
    });
    useEffect(() => {

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
                setAccount(resAccount)
            }
        }

        if (token != null && !account) {
            fetchCurrentAccount()
        }

    }, [token, account, setAccount, mutateAsync]);

    const onLogOut = () => {
        paymentToken.removePaymentToken()
        setAccount(null)
    }

    return (
        <AccountProfile
            label={account?.name}
            onLogin={() => {
                navigate('auth/login');
            }}
            onLogOut={()=> onLogOut()}
            avatar={account?.googleAccount?.picture}
            icon={<ICPayments.User stroke='#22356F'/>}
        />
    );
};
