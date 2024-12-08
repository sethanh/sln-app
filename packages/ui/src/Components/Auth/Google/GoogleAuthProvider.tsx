
import { PropsWithChildren } from "react";
import { IGoogleAuthProviderProps } from "./IGoogleAuthProviderProps";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const GoogleAuthProvider: React.FC<PropsWithChildren<IGoogleAuthProviderProps>> = ({
    children,
    clientId
}) => {

    return (
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    );
};