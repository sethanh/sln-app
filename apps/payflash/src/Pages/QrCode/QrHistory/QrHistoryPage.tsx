import React from 'react';
import { GoogleLogin } from './Components/GoogleLogin';
import { GoogleAuthProvider } from '@my-monorepo/ui'
import { appConstant } from '@my-monorepo/payflash/Constants'

const QrHistoryPage: React.FC = () => {
    return (
        <GoogleAuthProvider clientId={appConstant.googleClientId}>
            <div>
                <GoogleLogin />
            </div>
        </GoogleAuthProvider>
    );
};

export { QrHistoryPage }
