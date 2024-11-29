import React, { useEffect } from 'react';
import { AccountProfile } from '@my-monorepo/ui'
import { useNavigate } from "react-router"
import { useAtom } from 'jotai';
import { appConstant, urlConstant } from '@my-monorepo/payflash/Constants';

import { paymentToken } from '@my-monorepo/payflash/Root';
import { currentAccountAtom, paymentApiFetch } from '@my-monorepo/payflash/Root';
import { AccountModel } from '@my-monorepo/payflash/Models';
import { IRequestOptions } from 'packages/utils/src/services/IRequestOptions';

export const PayFlashAccountProfile: React.FC = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useAtom(currentAccountAtom)
    const token = paymentToken.getPaymentToken()
    useEffect(() => {

        async function fetchCurrentAccount() {

            var option: IRequestOptions = {
                method: 'GET'
            }

            const resAccount = await paymentApiFetch<AccountModel>(
                urlConstant.getCurrentAccountUrl,
                option,
                () => { },
                () => { },
            );

            if(resAccount)
            {
                setAccount(resAccount)
            }
        }

        if (token != null && !account) {
            fetchCurrentAccount()
        }

    }, [token, account]);

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
        />
    );
};
