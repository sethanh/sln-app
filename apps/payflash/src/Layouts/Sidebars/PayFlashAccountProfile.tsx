import React from 'react';
import { AccountProfile } from '@my-monorepo/ui'
import { useNavigate } from "react-router"
import { useAtom } from 'jotai';

import { paymentToken, useGlobalDrawer, usePaymentHttpCommand } from '@my-monorepo/payflash/Root';
import { currentAccountAtom } from '@my-monorepo/payflash/Root';
import { ICPayments } from '@my-monorepo/payflash/Assets';
import { AccountForm } from '@my-monorepo/payflash/Forms';
import { AccountResponse } from '@my-monorepo/payflash/Models';
import { urlConstant } from '@my-monorepo/payflash/Constants';

export const PayFlashAccountProfile: React.FC = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useAtom(currentAccountAtom)
    const { resetGlobalDrawerState, setGlobalDrawer } = useGlobalDrawer()
    const { mutateAsync } = usePaymentHttpCommand<AccountResponse>({});

    const showModalEditProfile= async () => {
        const profile = await mutateAsync(
            {
                url: urlConstant.account.accountDetail,
                requestOptions: {
                    method: "GET",
                    routeParams: {
                    id: account?.id || ''
                    }
                }
            }
        )

        if(!profile){ return ; }

        setGlobalDrawer({
            isOpen: true,
            titleTransCode: "Profile",
            content: (
                <AccountForm
                    onSuccess={() => {
                        resetGlobalDrawerState();
                    }}
                    defaultValues={profile}
                />
            ),
        });
    };

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
            onViewProfile={()=>showModalEditProfile()}
            avatar={account?.googleAccount?.picture}
            icon={<ICPayments.User stroke='#22356F'/>}
        />
    );
};
