import React from 'react';
import {SingleSidebar} from '@my-monorepo/ui'
import {TeamOutlined } from '@ant-design/icons';

export const TeamSidebar: React.FC = () => {
    return (
       <SingleSidebar 
            label='Team'
            PreIcon={<TeamOutlined />}
            value="team"
       />
    );
};
