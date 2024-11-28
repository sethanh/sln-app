import React from 'react';
import {QRCodeGenerator} from './Components'
import { useAtom } from 'jotai';
import { Account, currentAccountAtom } from '@my-monorepo/payflash/Root';

const GeneratePage: React.FC = () => {
    const [currentAccount, setCurrentAccount] = useAtom(currentAccountAtom);

    console.log(currentAccount);
    return (
        <div>
            GeneratePage
            <div style={{cursor: 'pointer', background:'blue'}}
                onClick={()=> {setCurrentAccount({id: 1, name:'abc'} as Account)}}
            > abc</div>
            <QRCodeGenerator/>
        </div>
    );
};

export { GeneratePage }
