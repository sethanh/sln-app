import { IAccountActionProps } from "./IAccountAction"

export interface IAccountProfile extends IAccountActionProps {
    avatar ?: string
    onLogin: () => void
    onLogOut: () => void
}

