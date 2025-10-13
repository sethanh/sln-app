import { 
   UserOutlined
} from "@ant-design/icons";
// import {  TaskPage } from "../Pages";
import { ISidebarItemProps } from "@my-monorepo/ui";
import { TermPage } from "../Pages/Term";


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


