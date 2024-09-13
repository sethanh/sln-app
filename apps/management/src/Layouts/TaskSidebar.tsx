import React from 'react';
import {GroupSidebar, ISidebarItemProps} from '@my-monorepo/ui'
import { CopyOutlined, FontSizeOutlined, RadiusSettingOutlined } from '@ant-design/icons';

const sidebarItems : ISidebarItemProps[]= [
    {
        label: "Today",
        Icon: <CopyOutlined />
    },
    {
        label: "All",
        Icon: <RadiusSettingOutlined />
    },
    {
        label: "Management",
        Icon: <FontSizeOutlined />
    },
    {
        label: "Back Log",
        Icon: <FontSizeOutlined />
    }
]  as ISidebarItemProps[];

export const TaskSidebar: React.FC = () => {
    return (
       <GroupSidebar 
            label='Task'
            onClick={()=>{}}
            sidebarItems={sidebarItems}
       />
    );
};
