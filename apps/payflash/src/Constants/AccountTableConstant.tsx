import { ColumnsType } from "antd/es/table/interface"
import { Avatar, MenuProps } from "antd"
import { EditOutlined, DeleteOutlined} from "@ant-design/icons"
import { IPaymentAccountTableProps, IBankNameProps, IUserProps } from "../Pages"
import { getInitials } from "@my-monorepo/ui"

export const actionItems : MenuProps['items'] = [
    {
        label: "Account Management",
        key: "1",
    },
    {
        label: "Setting Payment order",
        key: "2",
    }
]

export const bankNameOptions = [
    {
        label: "OCB",
        value: "OCB",
    },
    {
        label: "Vietcombank",
        value: "Vietcombank",
    }
]

export const bankGroupOptions = [
    {
        label: "Group A",
        value: "Group A",
    },
    {
        label: "Group B",
        value: "Group B",
    }
]

export const rawColumns : ColumnsType<IPaymentAccountTableProps> = [
    {
        title: "ID",
        dataIndex: "ID",
        key: "ID",
        render: (text) => <a href="#">{text}</a>,
        sorter: (a, b) => {
            const a_length = a.ID.length;
            const b_length = b.ID.length;

            const a_num = parseInt(a.ID[a_length - 1]);
            const b_num = parseInt(b.ID[b_length - 1]);

            if (a_num > b_num) 
                return 1;
            return 0;
        }
    },
    {
        title: "Bank Name",
        dataIndex: "BankName",
        key: "BankName",
        render: ({ name, icon } : IBankNameProps) => {
            return (
                <h4 style={{ fontWeight: "normal", margin : 0}}>{name}</h4>
            )
        }
    },
    {
        title: "Bank Account Number",
        dataIndex: "BankAccountNumber",
        key: "BankAccountNumber",
    },
    {
        title: "Group",
        dataIndex: "Group",
        key: "Group",
    },
    {
        title: "Created On",
        dataIndex: "CreatedOn",
        key: "CreatedOn",
        render: (date) => date.toLocaleString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}),
    },
    {
        title: "Action",
        key: "action",
        render: () => (
            <div style={{display: "flex", gap: "2rem"}}>
                <EditOutlined style={{fontSize: "1.2rem", cursor: "pointer"}}/>
                <DeleteOutlined style={{fontSize: "1.2rem", cursor: "pointer"}}/>
            </div>
        ),
    }
]

export const rawDatasource : IPaymentAccountTableProps[] = [
    {
        ID: "00001",
        BankName: {
            name: "Bank A",
        },
        BankAccountNumber: "1234567890",
        Group: "Group A",
        CreatedOn: new Date(),
    }, 
    {
        ID: "00002", 
        BankName: {
            name: "Bank A",
        },
        BankAccountNumber: "1234567890",
        CreatedOn: new Date(),
    },
    {
        ID: "00002",
        BankName: {
            name: "Bank A",
        },
        BankAccountNumber: "1234567890",
        CreatedOn: new Date(),
    },
    {
        ID: "00002",
        BankName: {
            name: "Bank A",
        },
        BankAccountNumber: "1234567890",
        CreatedOn: new Date(),
    },
    {
        ID: "00002",
        BankName: {
            name: "Bank A",
        },
        BankAccountNumber: "1234567890",
        CreatedOn: new Date(),
    }
]