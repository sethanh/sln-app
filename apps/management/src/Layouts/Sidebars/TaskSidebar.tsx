import React from 'react';
import {GroupSidebar, ISidebarItemProps} from '@my-monorepo/ui'
import { ClusterOutlined, NodeIndexOutlined, ScheduleOutlined, SlidersOutlined, UnorderedListOutlined } from '@ant-design/icons';

const sidebarItems : ISidebarItemProps[]= [
    {
        label: "Today",
        Icon: <ScheduleOutlined />,
        value: 'task/today'
    },
    {
        label: "All",
        Icon: <UnorderedListOutlined />,
        value: 'task/all'
    },
    {
        label: "Management",
        Icon: <ClusterOutlined />,
        value: 'task/management'
    },
    {
        label: "Back Log",
        Icon: <SlidersOutlined />,
        value: 'task/back-log'
    }
]  as ISidebarItemProps[];

export const TaskSidebar: React.FC = () => {

    return (
       <GroupSidebar 
            label='Task'
            sidebarItems={sidebarItems}
            Icon={<NodeIndexOutlined />}
       />
    );
};
