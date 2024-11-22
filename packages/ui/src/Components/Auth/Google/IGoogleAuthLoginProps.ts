import { TokenResponse } from "@react-oauth/google"

export interface IGoogleAuthLoginProps {
    onHandleSuccess: (response: TokenResponse) => void,
    onHandleError: () => void,
    children: (login: () => void) => React.ReactNode;
}