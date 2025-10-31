import React, { useCallback } from 'react';
import { AccountAction, useGlobalDrawer } from '@my-monorepo/ui';
import { useAtom } from 'jotai';
import { 
    AccountForm, 
    currentAccountAtom, 
    urlConstant, 
    usePaymentHttpCommand 
} from '../..';
import { AccountResponse } from '@my-monorepo/payflash/Models';

export const PayFlashAccountAction: React.FC = () => {
    const [account] = useAtom(currentAccountAtom);
    const { resetGlobalDrawerState, setGlobalDrawer } = useGlobalDrawer();
    const { mutateAsync } = usePaymentHttpCommand<AccountResponse>({});

    const showModalEditProfile = useCallback(async () => {
        if (!account?.id) return;

        try {
            const profile = await mutateAsync({
                url: urlConstant.account.accountDetail,
                requestOptions: {
                    method: 'GET',
                    routeParams: { id: account.id },
                },
            });

            if (!profile) return;

            setGlobalDrawer({
                isOpen: true,
                titleTransCode: 'Profile',
                content: (
                    <AccountForm
                        onSuccess={resetGlobalDrawerState}
                        defaultValues={profile}
                    />
                ),
                submitText: 'Update profile'
            });
        } catch (error) {
            console.error('Failed to load account detail:', error);
        }
    }, [account?.id, mutateAsync, resetGlobalDrawerState, setGlobalDrawer]);

    const label = React.useMemo(() => account?.name || 'Unknown Account', [account?.name]);

    return (
        <AccountAction
            label={label}
            onViewProfile={showModalEditProfile}
        />
    );
};
