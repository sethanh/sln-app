import React from "react"
import { IRouteAppItem } from "../../Routes/IRouteApp"

export interface IGroupSidebarProps {
    label: string
    className?: string
    sidebarItems?: ISidebarItemProps[]
    Icon?: React.ReactNode 
    border?: boolean
    defaultShowItem?: boolean,
    onClick?: (value?: string) => void
}

export interface ISingleSidebarProps {
    label: string
    className?: string
    PreIcon?: React.ReactNode 
    border?: boolean
    NextIcon?: React.ReactNode
    onClick?: (value?: string) => void
    name?: string
    value?: string
}

export interface ISidebarItemProps extends IRouteAppItem {
    name?: string
    onClick?: (value?: string) => void
    className?: string
    Icon?: React.ReactNode 
}