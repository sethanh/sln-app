import { ColumnsType } from "antd/es/table/interface"
import { IAccountProps } from "../Pages"

export const rawColumns : ColumnsType<IAccountProps> = [
    {
        title: 'Account Type',
        dataIndex: 'accountType',
        key: 'accountType',
    },
    {
        title: 'Account Name',
        dataIndex: 'accountName',
        key: 'accountName',
    },
    {
        title: 'Account Number',
        dataIndex: 'accountNumber',
        key: 'accountNumber',
    },
    {
        title: 'Account Balance',
        dataIndex: 'accountBalance',
        key: 'accountBalance',
    },
]

export const rawDatasource : IAccountProps[] = [
    {
        accountType: 'Bank',
        accountName: 'OCB',
        accountNumber: '1234567890',
        accountBalance: 1000000,
    },
    {
        accountType: 'Digital Wallet',
        accountName: 'Momo',
        accountBalance: 1000000,
    }
]