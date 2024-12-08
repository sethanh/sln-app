import { 
   RiseOutlined, UserOutlined
} from "@ant-design/icons";
// import {  TaskPage } from "../Pages";
import { LoginPage, RegistryPage } from "@my-monorepo/management/Pages";
import { ISidebarItemProps } from "@my-monorepo/ui";


const authConstants : ISidebarItemProps[]= [
    {
        label: "Personal",
        Icon: <UserOutlined />,
        path: 'auth/login',
        page : <LoginPage/>
    },
    {
        label: "Planning",
        Icon: <RiseOutlined />,
        path: 'auth/registry',
        page : <RegistryPage />
    }
]


export { 
    authConstants, 
}


