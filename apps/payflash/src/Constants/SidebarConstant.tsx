import { 
    HistoryOutlined, 
    ReadOutlined, 
    FileDoneOutlined
} from "@ant-design/icons";
// import {  TaskPage } from "../Pages";
import { ContactPage, FlashPage, GeneratePage, PaymentPage } from "@my-monorepo/payflash/Pages";
import { TeamPage } from "@my-monorepo/payflash/Pages";
import { DocumentPage } from "@my-monorepo/payflash/Pages";
import { ISidebarItemProps } from "@my-monorepo/ui";
import { Card, Empty } from "antd";
import { ICContacts, ICPayments } from "../Assets";

const cardHolderConstants : ISidebarItemProps[]= [
    {
        label: "Contact",
        Icon: <ICContacts.Link/>,
        path: 'card-holder/contact',
        page : <ContactPage/>
    },
    {
        label: "Setting",
        Icon: <ICPayments.Setting />,
        path: 'card-holder/setting',
        page: <Card><Empty description="Feature under development"/></Card>
    }
]

const qrCodeSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Generate",
        Icon: <ICPayments.QrPlus />,
        path: 'qrcode/generate',
        page: <GeneratePage/>

    },
    {
        label: "History",
        Icon: <ICPayments.Clock />,
        path: 'qrcode/history',
        page: <Card><Empty description="Feature under development"/></Card>

    },
    {
        label: "Setting",
        Icon: <ICPayments.Setting />,
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
        Icon: <ICPayments.QrCode />,
        path: 'payment/flash',
        page : <FlashPage/>
    },
    {
        label: "Payment amount qr",
        Icon: <ICPayments.Credit/>,
        path: 'payment/amount',
        page : <PaymentPage/>
    },
    {
        label: "Histories",
        Icon: <ICPayments.Clock/>,
        path: 'payment/history',
        page :<Card><Empty description="Feature under development"/></Card>
    },
    {
        label: "Setting",
        Icon: <ICPayments.Setting/>,
        path: 'payment/setting',
        page : <Card><Empty description="Feature under development"/></Card>
    }
]

const teamSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Team",
        Icon: <ICPayments.Team />,
        path: 'team',
        page : <TeamPage/>
    }
]

const documentSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Document",
        Icon: <ICPayments.Document />,
        path: 'document',
        page : <DocumentPage/>
    }
]

const homeConstants : ISidebarItemProps[]= [
    {
        label: "Flash qr payment",
        Icon: <ReadOutlined />,
        path: '',
        page : <ContactPage/>
    }
]

export { 
    paymentSidebarConstants, 
    qrCodeSidebarConstants, 
    teamSidebarConstants, 
    taxSidebarConstants,
    documentSidebarConstants,
    homeConstants,
    cardHolderConstants,
}


