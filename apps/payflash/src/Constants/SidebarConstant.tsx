import { 
    HistoryOutlined, ClusterOutlined, CreditCardOutlined, QrcodeOutlined, UngroupOutlined, SlidersOutlined, UnorderedListOutlined, 
    TeamOutlined, ReadOutlined, SettingOutlined
} from "@ant-design/icons";
// import {  TaskPage } from "../Pages";
import { PersonalPage, PlanningPage, ObjectivePage,  FinancialManagementPage } from "@my-monorepo/payflash/Pages";
import { AllTaskPage, TodayTaskPage, ManagementTaskPage, BackLogPage } from "@my-monorepo/payflash/Pages";
import { TeamPage } from "@my-monorepo/payflash/Pages";
import { DocumentPage } from "@my-monorepo/payflash/Pages";
import { ISidebarItemProps } from "@my-monorepo/ui";



const qrCodeSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Generate",
        Icon: <UngroupOutlined />,
        path: 'task/today',
        page: <TodayTaskPage />

    },
    {
        label: "History",
        Icon: <HistoryOutlined />,
        path: 'task/all',
        page: <AllTaskPage />

    },
    {
        label: "Setting",
        Icon: <SettingOutlined />,
        path: 'task/management',
        page: <ManagementTaskPage />
    }
] 

const financialSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Flash qr payment",
        Icon: <QrcodeOutlined />,
        path: 'financial/personal',
        page : <PersonalPage/>
    },
    {
        label: "Payment amount qr",
        Icon: <CreditCardOutlined />,
        path: 'financial/planing',
        page : <PlanningPage />
    },
    {
        label: "Histories",
        Icon: <HistoryOutlined />,
        path: 'financial/objective',
        page : <ObjectivePage />
    },
    {
        label: "Setting",
        Icon: <SettingOutlined />,
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
    qrCodeSidebarConstants as taskSidebarConstants, 
    teamSidebarConstants, 
    documentSidebarConstants 
}


