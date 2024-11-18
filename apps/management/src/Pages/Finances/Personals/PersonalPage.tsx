import { RootState } from '@my-monorepo/management/App/Store';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';



const PersonalPage: React.FC = () => {

    const language = useSelector((state: RootState) => state.language.language);
    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    console.log(language, currentUser);
    
    return (
        <div>
            PersonalPage
        </div>
    );
};

export { PersonalPage }
