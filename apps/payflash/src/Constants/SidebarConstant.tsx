import { 
    HistoryOutlined, CreditCardOutlined, QrcodeOutlined, UngroupOutlined, 
    TeamOutlined, ReadOutlined, SettingOutlined
} from "@ant-design/icons";
// import {  TaskPage } from "../Pages";
import { FlashPage, PlanningPage, HistoryPage,  PaymentSettingPage } from "@my-monorepo/payflash/Pages";
import { QrHistoryPage, GeneratePage, QrSettingPage } from "@my-monorepo/payflash/Pages";
import { TeamPage } from "@my-monorepo/payflash/Pages";
import { DocumentPage } from "@my-monorepo/payflash/Pages";
import { ISidebarItemProps } from "@my-monorepo/ui";



const qrCodeSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Generate",
        Icon: <UngroupOutlined />,
        path: 'qrcode/generate',
        page: <GeneratePage />

    },
    {
        label: "History",
        Icon: <HistoryOutlined />,
        path: 'qrcode/history',
        page: <QrHistoryPage />

    },
    {
        label: "Setting",
        Icon: <SettingOutlined />,
        path: 'qrcode/setting',
        page: <QrSettingPage />
    }
] 

const paymentSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Flash qr payment",
        Icon: <QrcodeOutlined />,
        path: 'payment/flash',
        page : <FlashPage/>
    },
    {
        label: "Payment amount qr",
        Icon: <CreditCardOutlined />,
        path: 'payment/amount',
        page : <PlanningPage />
    },
    {
        label: "Histories",
        Icon: <HistoryOutlined />,
        path: 'payment/history',
        page : <HistoryPage />
    },
    {
        label: "Setting",
        Icon: <SettingOutlined />,
        path: 'payment/setting',
        page : <PaymentSettingPage />
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
    paymentSidebarConstants, 
    qrCodeSidebarConstants, 
    teamSidebarConstants, 
    documentSidebarConstants 
}


