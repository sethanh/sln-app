import React from 'react';
import {SingleSidebar} from '@my-monorepo/ui'
import {ReadOutlined} from '@ant-design/icons';

export const DocumentSidebar: React.FC = () => {
    return (
       <SingleSidebar 
            label='Document'
            PreIcon={<ReadOutlined />}
            value="document"
       />
    );
};
