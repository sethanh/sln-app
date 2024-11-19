import { clearAccount, setAccount } from '@my-monorepo/management/Root';
import { RootState } from '@my-monorepo/management/Root/Store';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';



const PersonalPage: React.FC = () => {
    const dispatch = useDispatch()
    const language = useSelector((state: RootState) => state.language.language);
    const currentUser = useSelector((state: RootState) => state.account.accountUser);

    console.log(language, currentUser);
    
    return (
        <div>
            <div style={{ padding: '2px 10px', border: '1px solid blue', width: 80, cursor: 'pointer', textAlign: 'center' }}
                onClick={() => { currentUser ? dispatch(clearAccount()) : dispatch(setAccount('van phuong')) }}
            >Setup</div>
            PersonalPage
        </div>
    );
};

export { PersonalPage }
