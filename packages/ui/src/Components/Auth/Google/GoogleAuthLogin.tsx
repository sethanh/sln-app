import React from 'react';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { IGoogleAuthLoginProps } from './IGoogleAuthLoginProps';

const GoogleAuthLogin: React.FC<IGoogleAuthLoginProps> = ({
    onHandleSuccess, 
    onHandleError,
    children
}) => {
    const login = useGoogleLogin({
        onSuccess: (tokenResponse: TokenResponse) => {
            onHandleSuccess(tokenResponse);
        },
        onError: () => {
            onHandleError();
        },
      });

    return <>{children(login)}</>;
};

export {GoogleAuthLogin};
