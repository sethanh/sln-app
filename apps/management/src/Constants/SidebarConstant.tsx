import { 
    AimOutlined, ClusterOutlined, RiseOutlined, UserOutlined, ScheduleOutlined, SlidersOutlined, UnorderedListOutlined, 
    TeamOutlined, ReadOutlined 
} from "@ant-design/icons";
// import {  TaskPage } from "../Pages";
import { PersonalPage, PlanningPage, ObjectivePage,  FinancialManagementPage } from "@my-monorepo/management/Pages";
import { AllTaskPage, TodayTaskPage, ManagementTaskPage, BackLogPage } from "@my-monorepo/management/Pages";
import { TeamPage } from "@my-monorepo/management/Pages";
import { DocumentPage } from "@my-monorepo/management/Pages";
import { ISidebarItemProps } from "@my-monorepo/ui";



const taskSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Today",
        Icon: <ScheduleOutlined />,
        path: 'task/today',
        page: <TodayTaskPage />

    },
    {
        label: "All",
        Icon: <UnorderedListOutlined />,
        path: 'task/all',
        page: <AllTaskPage />

    },
    {
        label: "Management",
        Icon: <ClusterOutlined />,
        path: 'task/management',
        page: <ManagementTaskPage />
    },
    {
        label: "Back Log",
        Icon: <SlidersOutlined />,
        path: 'task/back-log',
        page: <BackLogPage />
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

const teamSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Team",
        Icon: <TeamOutlined />,
        path: 'team',
        page : <TeamPage/>
    }
]

const documentSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Document",
        Icon: <ReadOutlined />,
        path: 'document',
        page : <DocumentPage/>
    }
]

export { 
    financialSidebarConstants, 
    taskSidebarConstants, 
    teamSidebarConstants, 
    documentSidebarConstants 
}


