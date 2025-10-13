import { 
   UserOutlined
} from "@ant-design/icons";
// import {  TaskPage } from "../Pages";
import { TermPage } from "@my-monorepo/management/Pages";
import { ISidebarItemProps } from "@my-monorepo/ui";


const termConstants : ISidebarItemProps[]= [
    {
        label: "Personal",
        Icon: <UserOutlined />,
        path: 'privacy',
        page : <TermPage/>
    }
]


export { 
    termConstants, 
}


