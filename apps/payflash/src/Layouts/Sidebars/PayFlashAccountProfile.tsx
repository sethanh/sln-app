import React from 'react';
import { AccountProfile } from '@my-monorepo/ui'
import { useNavigate } from "react-router"
import { useAtom } from 'jotai';

import { paymentToken, useGlobalDrawer } from '@my-monorepo/payflash/Root';
import { currentAccountAtom } from '@my-monorepo/payflash/Root';
import { ICPayments } from '@my-monorepo/payflash/Assets';
import { AccountForm } from '@my-monorepo/payflash/Forms';

export const PayFlashAccountProfile: React.FC = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useAtom(currentAccountAtom)
    const { resetGlobalDrawerState, setGlobalDrawer } = useGlobalDrawer()

    const showModalEditProfile= () => {
        setGlobalDrawer({
            isOpen: true,
            titleTransCode: "Profile",
            content: (
                <AccountForm
                onSuccess={() => {
                    resetGlobalDrawerState();
                }}
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
            onViewprofile={()=>showModalEditProfile()}
            avatar={account?.googleAccount?.picture}
            icon={<ICPayments.User stroke='#22356F'/>}
        />
    );
};
