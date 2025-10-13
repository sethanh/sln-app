import { 
    HistoryOutlined, UngroupOutlined
} from "@ant-design/icons";
// import {  TaskPage } from "../Pages";
import { LoginPage, RegistryPage } from "@my-monorepo/payflash/Pages";
import { ISidebarItemProps } from "@my-monorepo/ui";
const authConstants: ISidebarItemProps[]= [
    {
        label: "Generate",
        Icon: <UngroupOutlined />,
        path: 'auth/login',
        page: <LoginPage />

    },
    {
        label: "History",
        Icon: <HistoryOutlined />,
        path: 'auth/registry',
        page: <RegistryPage />

    }
] 


export const mainRootConstants = { 
    authConstants
}


