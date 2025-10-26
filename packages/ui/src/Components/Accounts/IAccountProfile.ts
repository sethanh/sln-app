import { IAccountActionProps } from "./IAccountAction"

export interface IAccountProfile extends IAccountActionProps {
    avatar ?: string
    icon ?: React.ReactNode
    onLogin: () => void
    onLogOut: () => void
    onViewprofile?: () => void
}

