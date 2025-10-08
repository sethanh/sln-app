import { 
    HistoryOutlined, CreditCardOutlined, QrcodeOutlined, UngroupOutlined, 
    TeamOutlined, ReadOutlined, SettingOutlined,
    FileDoneOutlined
} from "@ant-design/icons";
// import {  TaskPage } from "../Pages";
import { FlashPage, GeneratePage } from "@my-monorepo/payflash/Pages";
import { TeamPage } from "@my-monorepo/payflash/Pages";
import { DocumentPage } from "@my-monorepo/payflash/Pages";
import { ISidebarItemProps } from "@my-monorepo/ui";
import { Card, Empty } from "antd";

const qrCodeSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Generate",
        Icon: <UngroupOutlined />,
        path: 'qrcode/generate',
        page: <GeneratePage/>

    },
    {
        label: "History",
        Icon: <HistoryOutlined />,
        path: 'qrcode/history',
        page: <Card><Empty description="Feature under development"/></Card>

    },
    {
        label: "Setting",
        Icon: <SettingOutlined />,
        path: 'qrcode/setting',
        page: <Card><Empty description="Feature under development"/></Card>
    }
] 

const taxSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Tax",
        Icon: <FileDoneOutlined />,
        path: 'tax/generate',
        page: <Card><Empty description="Feature under development"/></Card>

    },
    {
        label: "History",
        Icon: <HistoryOutlined />,
        path: 'tax/history',
        page: <Card><Empty description="Feature under development"/></Card>

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
        page : <Card><Empty description="Feature under development"/></Card>
    },
    {
        label: "Histories",
        Icon: <HistoryOutlined />,
        path: 'payment/history',
        page :<Card><Empty description="Feature under development"/></Card>
    },
    {
        label: "Setting",
        Icon: <SettingOutlined />,
        path: 'payment/setting',
        page : <Card><Empty description="Feature under development"/></Card>
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

const homeConstants : ISidebarItemProps[]= [
    {
        label: "Flash qr payment",
        Icon: <ReadOutlined />,
        path: '',
        page : <FlashPage/>
    }
]

export { 
    paymentSidebarConstants, 
    qrCodeSidebarConstants, 
    teamSidebarConstants, 
    taxSidebarConstants,
    documentSidebarConstants,
    homeConstants
}


