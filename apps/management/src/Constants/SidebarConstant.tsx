import { AimOutlined, ClusterOutlined, RiseOutlined, UserOutlined, ScheduleOutlined, SlidersOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {  TaskPage } from "../Pages";
import { PersonalPage, PlanningPage, ObjectivePage,  FinancialManagementPage } from "../Pages/Finances";
import { ISidebarItemProps } from "@my-monorepo/ui";

const taskSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Today",
        Icon: <ScheduleOutlined />,
        path: 'task/today',
        page: <TaskPage />
    },
    {
        label: "All",
        Icon: <UnorderedListOutlined />,
        path: 'task/all',
        page: <TaskPage />
    },
    {
        label: "Management",
        Icon: <ClusterOutlined />,
        path: 'task/management',
        page: <TaskPage />
    },
    {
        label: "Back Log",
        Icon: <SlidersOutlined />,
        path: 'task/back-log',
        page: <TaskPage />
    }
] 

const financialSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Personal",
        Icon: <UserOutlined />,
        path: 'financial/personal',
        page : <PersonalPage/>
    },
    {
        label: "Planning",
        Icon: <RiseOutlined />,
        path: 'financial/planing',
        page : <PlanningPage />
    },
    {
        label: "Objective",
        Icon: <AimOutlined />,
        path: 'financial/objective',
        page : <ObjectivePage />
    },
    {
        label: "Management",
        Icon: <ClusterOutlined />,
        path: 'financial/management',
        page : <FinancialManagementPage />
    }
]

export { financialSidebarConstants, taskSidebarConstants }


