import React from 'react';
import {GroupSidebar, ISidebarItemProps} from '@my-monorepo/ui'
import { CopyOutlined, FontSizeOutlined, RadiusSettingOutlined } from '@ant-design/icons';

const sidebarItems : ISidebarItemProps[]= [
    {
        label: "Personal",
        Icon: <CopyOutlined />
    },
    {
        label: "Planning",
        Icon: <RadiusSettingOutlined />
    },
    {
        label: "Management",
        Icon: <FontSizeOutlined />
    },
]  as ISidebarItemProps[];

export const FinancialSidebar: React.FC = () => {
    return (
       <GroupSidebar 
            label='Financial'
            onClick={()=>{}}
            sidebarItems={sidebarItems}
       />
    );
};
