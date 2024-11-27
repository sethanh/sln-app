import { currentAccountAtom } from '@my-monorepo/payflash/Root';
import { useAtom } from 'jotai';
import React from 'react';

const QrSettingPage: React.FC = () => {
    const [currentAccount, setCurrentAccount] = useAtom(currentAccountAtom);

    console.log('abc', currentAccount);
    return (
        <div>
            QrSettingPage
        </div>
    );
};

export { QrSettingPage }
