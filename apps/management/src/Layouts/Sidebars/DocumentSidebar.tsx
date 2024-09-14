import React from 'react';
import {SingleSidebar} from '@my-monorepo/ui'
import {ReadOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const DocumentSidebar: React.FC = () => {
    const navigate = useNavigate();
    return (
       <SingleSidebar 
            label='Document'
            PreIcon={<ReadOutlined />}
            value="document"
            onClick={(e?: string)=> navigate(e||"")}
       />
    );
};
