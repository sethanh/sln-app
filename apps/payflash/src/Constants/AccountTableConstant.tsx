import { ColumnsType } from "antd/es/table/interface"
import { Avatar, MenuProps } from "antd"
import { EditOutlined, DeleteOutlined} from "@ant-design/icons"
import { IAccountProps, IUserProps } from "../Pages"
import { getInitials } from "@my-monorepo/ui"

export const actionItems : MenuProps['items'] = [
    {
        label: "Action A",
        key: "1",
    },
    {
        label: "Action B",
        key: "2",
    }
]

export const genderOptions = [
    {
        label: "Male",
        value: "male",
    },
    {
        label: "Female",
        value: "female",
    }
]

export const clientGroupOptions = [
    {
        label: "Client A",
        value: "clientA",
    },
    {
        label: "Client B",
        value: "clientB",
    }
]

export const employeeOptions = [
    {
        label: "Employee A",
        value: "employeeA",
    },
    {
        label: "Employee B",
        value: "employeeB",
    }
]

export const clientSourceOptions = [
    {
        label: "Source A",
        value: "sourceA",
    },
    {
        label: "Source B",
        value: "sourceB",
    }
]

export const referredByOptions = [
    {
        label: "Employee",
        value: "Employee",
    },
    {
        label: "Client",
        value: "Client",
    }
]

export const rawColumns : ColumnsType<IAccountProps> = [
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
        title: "Name",
        dataIndex: "Name",
        key: "Name",
        render: ({ username, email } : IUserProps) => {
            const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
            return (
                <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                    <Avatar size={34} style={{ backgroundColor: randomColor }}>{getInitials(username)}</Avatar>
                    <div>
                        <h4 style={{ fontWeight: "normal", margin : 0}}>{username}</h4>
                        <h5 style={{ fontWeight: "normal", margin : 0}}>{email}</h5>
                    </div>
                </div>
            )
        },
    },
    {
        title: "Phone",
        dataIndex: "Phone",
        key: "Phone",
    },
    {
        title: "Group",
        dataIndex: "Group",
        key: "Group",
    },
    {
        title: "Source",
        dataIndex: "Source",
        key: "Source",
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

export const rawDatasource : IAccountProps[] = [
    {
        ID: "CRM_00001",
        Name: {
            username: "John Doe",
            email: "5oV6O@example.com",
        },
        Phone: "1234567890",
        Group: "Group A",
        Source: "Source A",
        CreatedOn: new Date(),
    }, 
    {
        ID: "CRM_00002",
        Name: {
            username: "Ahihi Leuleu",
            email: "abc@gmail.com",
        },
        Phone: "1325465470",
        CreatedOn: new Date(),
    },
    {
        ID: "CRM_00002",
        Name: {
            username: "Ahihi Leuleu",
            email: "abc@gmail.com",
        },
        Phone: "1325465470",
        CreatedOn: new Date(),
    },
    {
        ID: "CRM_00002",
        Name: {
            username: "Ahihi Leuleu",
            email: "abc@gmail.com",
        },
        Phone: "1325465470",
        CreatedOn: new Date(),
    },
    {
        ID: "CRM_00002",
        Name: {
            username: "Ahihi Leuleu",
            email: "abc@gmail.com",
        },
        Phone: "1325465470",
        CreatedOn: new Date(),
    }
]