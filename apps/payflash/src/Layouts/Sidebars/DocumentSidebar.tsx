import React from 'react';
import {SingleSidebar} from '@my-monorepo/ui'
import {documentSidebarConstants} from  '@my-monorepo/payflash/Constants'
const documentSidebar = documentSidebarConstants[0]

export const DocumentSidebar: React.FC = () => {
    return (
       <SingleSidebar 
            label={documentSidebar.label || ''}
            PreIcon={documentSidebar.Icon}
            value={documentSidebar.path}
            border={true}
       />
    );
};
