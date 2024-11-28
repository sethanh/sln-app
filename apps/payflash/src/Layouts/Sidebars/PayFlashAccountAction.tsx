import React from 'react';
import { AccountAction } from '@my-monorepo/ui'
import { useAtom } from 'jotai';
import { currentAccountAtom } from '../..';

export const PayFlashAccountAction: React.FC = () => {
    const [account] = useAtom(currentAccountAtom)
    return (
        <AccountAction
            label={account?.name || 'Unknown Account'}
        />
    );
};