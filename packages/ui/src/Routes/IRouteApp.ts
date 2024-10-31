import { LoaderFunction } from 'react-router-dom';

export interface IRouteApp {
   routes: IRouteAppItem[]
}

export interface IRouteAppItem {
    label?: string
    path: string
    page: React.ReactNode
    loader?: LoaderFunction
}


