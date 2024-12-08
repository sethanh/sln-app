import React from "react"
import { IRouteAppItem } from "../../Routes/IRouteApp"
import { IStyle } from "../Roots/IRoots"

export interface IGroupSidebarProps extends IStyle {
    label: string
    className?: string
    sidebarItems?: ISidebarItemProps[]
    Icon?: React.ReactNode 
    border?: boolean
    defaultShowItem?: boolean,
    onClick?: (value?: string) => void
}

export interface ISingleSidebarProps extends IStyle {
    label: string
    className?: string
    PreIcon?: React.ReactNode 
    border?: boolean
    NextIcon?: React.ReactNode
    onClick?: (value?: string) => void
    name?: string
    value?: string
}

export interface ISidebarItemProps extends IRouteAppItem, IStyle {
    name?: string
    onClick?: (value?: string) => void
    className?: string
    Icon?: React.ReactNode 
}