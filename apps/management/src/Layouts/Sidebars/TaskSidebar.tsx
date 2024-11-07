import React from 'react';
import { taskSidebarConstants } from '@my-monorepo/management/Constants';
import { NodeIndexOutlined } from '@ant-design/icons';
import { GroupSidebar } from '@my-monorepo/ui';

export const TaskSidebar: React.FC = () => {

    return (
       <GroupSidebar 
            label='Task'
            sidebarItems={taskSidebarConstants}
            Icon={<NodeIndexOutlined />}
            defaultShowItem={true}
       />
    );
};
