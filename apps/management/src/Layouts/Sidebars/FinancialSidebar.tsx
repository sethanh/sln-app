import React from 'react';
import {GroupSidebar, ISidebarItemProps} from '@my-monorepo/ui'
import { AimOutlined, ClusterOutlined, FundProjectionScreenOutlined, RiseOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const sidebarItems : ISidebarItemProps[]= [
    {
        label: "Personal",
        Icon: <UserOutlined />,
        value: 'financial/personal'
    },
    {
        label: "Planning",
        Icon: <RiseOutlined />,
        value: 'financial/planing'
    },
    {
        label: "Objective",
        Icon: <AimOutlined />,
        value: 'financial/objective'
    },
    {
        label: "Management",
        Icon: <ClusterOutlined />,
        value: 'financial/management'
    },
]  as ISidebarItemProps[];

export const FinancialSidebar: React.FC = () => {
    const navigate = useNavigate();
    
    return (
       <GroupSidebar 
            label='Financial'
            sidebarItems={sidebarItems}
            Icon={<FundProjectionScreenOutlined />}
            border={true}
            onClick={(e?: string)=> navigate(e||"")}
       />
    );
};
