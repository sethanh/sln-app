import React from 'react';
import {AccountProfile} from '@my-monorepo/ui'
import { useNavigate } from "react-router"

export const PayFlashAccountProfile: React.FC = () => {
    const navigate = useNavigate();
    return (
       <AccountProfile
            label={undefined}
            onLogin={()=>{
                navigate('auth/login');
            }}
            avatar='abc'
       />
    );
};
