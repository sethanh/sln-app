import { 
    HistoryOutlined, 
    ReadOutlined, 
    FileDoneOutlined
} from "@ant-design/icons";
// import {  TaskPage } from "../Pages";
import { ConnectPage, ContactPage, FlashPage, GeneratePage, PaymentPage } from "@my-monorepo/payflash/Pages";
import { TeamPage } from "@my-monorepo/payflash/Pages";
import { DocumentPage } from "@my-monorepo/payflash/Pages";
import { ISidebarItemProps } from "@my-monorepo/ui";
import { ICContacts, ICPayments } from "../Assets";
import { EmptyContainer } from "../Components";

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
        page: <EmptyContainer/>
    }
]

const qrCodeSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Generate",
        Icon: <ICPayments.QrPlus />,
        path: 'qrcode/generate',
        page: <GeneratePage/>

    },
    // {
    //     label: "History",
    //     Icon: <ICPayments.Clock />,
    //     path: 'qrcode/history',
    //     page: <EmptyContainer/>

    // },
    // {
    //     label: "Setting",
    //     Icon: <ICPayments.Setting />,
    //     path: 'qrcode/setting',
    //     page: <EmptyContainer/>
    // }
] 

const taxSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Tax",
        Icon: <FileDoneOutlined />,
        path: 'tax/generate',
        page: <EmptyContainer/>

    },
    {
        label: "History",
        Icon: <HistoryOutlined />,
        path: 'tax/history',
        page: <EmptyContainer/>

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
    // {
    //     label: "Histories",
    //     Icon: <ICPayments.Clock/>,
    //     path: 'payment/history',
    //     page :<EmptyContainer/>
    // },
    // {
    //     label: "Setting",
    //     Icon: <ICPayments.Setting/>,
    //     path: 'payment/setting',
    //     page : <EmptyContainer/>
    // }
]

const teamSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Team",
        Icon: <ICPayments.Team />,
        path: 'team',
        page : <TeamPage/>
    }
]

const messageSidebarConstants : ISidebarItemProps[]= [
    {
        label: "Message",
        Icon: <ICPayments.MessageCircle />,
        path: 'message',
        page : <DocumentPage/>
    },
    {
        label: "Connect",
        Icon: <ICPayments.Connection />,
        path: 'connect',
        page : <ConnectPage/>
    },
    {
        label: "Conversation",
        Icon: <ICPayments.Conversation />,
        path: 'conversation',
        page : <EmptyContainer/>
    },
    {
        label: "Notify setting",
        Icon: <ICPayments.MessageNotify />,
        path: 'notify',
        page : <EmptyContainer/>
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
    messageSidebarConstants,
    homeConstants,
    cardHolderConstants,
}


