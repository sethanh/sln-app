import React from 'react';
import {QRCodeGenerator} from './Components'
import { useAtom } from 'jotai';
import { currentAccountAtom } from '@my-monorepo/payflash/Root';

const GeneratePage: React.FC = () => {
    const [currentAccount] = useAtom(currentAccountAtom);

    console.log(currentAccount);
    return (
        <div>
            GeneratePage
            <QRCodeGenerator/>
        </div>
    );
};

export { GeneratePage }
