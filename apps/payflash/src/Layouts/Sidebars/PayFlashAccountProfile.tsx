import React from 'react';
import { AccountProfile } from '@my-monorepo/ui'
import { useNavigate } from "react-router"
import { useAtom } from 'jotai';

import { paymentToken } from '@my-monorepo/payflash/Root';
import { currentAccountAtom } from '@my-monorepo/payflash/Root';
import { ICPayments } from '@my-monorepo/payflash/Assets';

export const PayFlashAccountProfile: React.FC = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useAtom(currentAccountAtom)

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
            avatar={account?.picture}
            icon={<ICPayments.User stroke='#22356F'/>}
        />
    );
};
