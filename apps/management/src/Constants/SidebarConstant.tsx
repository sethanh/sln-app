import { AimOutlined, ClusterOutlined, RiseOutlined, UserOutlined, ScheduleOutlined, SlidersOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { ISidebarItemProps } from "@my-monorepo/ui";

const taskSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Today",
        Icon: <ScheduleOutlined />,
        path: 'task/today',
        page: 
    },
    {
        label: "All",
        Icon: <UnorderedListOutlined />,
        path: 'task/all',
        page: 
    },
    {
        label: "Management",
        Icon: <ClusterOutlined />,
        path: 'task/management',
        page: 
    },
    {
        label: "Back Log",
        Icon: <SlidersOutlined />,
        path: 'task/back-log',
        page: 
    }
] 

const financialSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Personal",
        Icon: <UserOutlined />,
        path: 'financial/personal',
        page : 
    },
    {
        label: "Planning",
        Icon: <RiseOutlined />,
        path: 'financial/planing',
        page : 
    },
    {
        label: "Objective",
        Icon: <AimOutlined />,
        path: 'financial/objective',
        page : 
    },
    {
        label: "Management",
        Icon: <ClusterOutlined />,
        path: 'financial/management',
        page : 
    }
]

export { financialSidebarConstants, taskSidebarConstants }


