import React from 'react';
import {SingleSidebar} from '@my-monorepo/ui'
import {TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const TeamSidebar: React.FC = () => {
    const navigate = useNavigate();
    return (
       <SingleSidebar 
            label='Team'
            PreIcon={<TeamOutlined />}
            value="team"
            onClick={(e?: string)=> navigate(e||'')}
       />
    );
};
