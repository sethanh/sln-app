import { 
    HistoryOutlined, CreditCardOutlined, QrcodeOutlined, UngroupOutlined, 
    TeamOutlined, ReadOutlined, SettingOutlined,
    FileDoneOutlined
} from "@ant-design/icons";
// import {  TaskPage } from "../Pages";
import { FlashPage } from "@my-monorepo/payflash/Pages";
import { TeamPage } from "@my-monorepo/payflash/Pages";
import { DocumentPage } from "@my-monorepo/payflash/Pages";
import { ISidebarItemProps } from "@my-monorepo/ui";
import { Empty } from "antd";

const qrCodeSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Generate",
        Icon: <UngroupOutlined />,
        path: 'qrcode/generate',
        page: <Empty description="Feature under development"/>

    },
    {
        label: "History",
        Icon: <HistoryOutlined />,
        path: 'qrcode/history',
        page: <Empty description="Feature under development"/>

    },
    {
        label: "Setting",
        Icon: <SettingOutlined />,
        path: 'qrcode/setting',
        page: <Empty description="Feature under development"/>
    }
] 

const taxSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Tax",
        Icon: <FileDoneOutlined />,
        path: 'tax/generate',
        page: <Empty description="Feature under development"/>

    },
    {
        label: "History",
        Icon: <HistoryOutlined />,
        path: 'tax/history',
        page: <Empty description="Feature under development"/>

    },
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
        page : <Empty description="Feature under development"/>
    },
    {
        label: "Histories",
        Icon: <HistoryOutlined />,
        path: 'payment/history',
        page :<Empty description="Feature under development"/>
    },
    {
        label: "Setting",
        Icon: <SettingOutlined />,
        path: 'payment/setting',
        page : <Empty description="Feature under development"/>
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
    taxSidebarConstants,
    documentSidebarConstants 
}


