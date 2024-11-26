import React from 'react';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { IGoogleAuthLoginProps } from './IGoogleAuthLoginProps';

const GoogleAuthLogin: React.FC<IGoogleAuthLoginProps> = ({
    onHandleSuccess, 
    onHandleError,
    onHandleClose,
    children
}) => {
    const login = useGoogleLogin({
        onSuccess: (tokenResponse: TokenResponse) => {
            onHandleSuccess(tokenResponse);
        },
        onError: () => {
            onHandleError();
        },
        onNonOAuthError: () => {
            onHandleClose();
        }
      });

    return <>{children(login)}</>;
};

export {GoogleAuthLogin};
