export interface IGroupSidebarProps {
    label: string
    onClick: () => void
    className?: string
    sidebarItems?: ISidebarItemProps[]
}

export interface ISidebarItemProps {
    label: string
    name?: string
    value?: string
    onClick?: () => void
    className?: string
    Icon?: React.ReactNode; 
}