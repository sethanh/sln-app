import React, { PropsWithChildren, FC, useState } from 'react';
import { ISingleSidebarProps } from './ISidebar';
import './Sidebar.css'
import { PlusOutlined} from '@ant-design/icons';


export const SingleSidebar: FC<PropsWithChildren<ISingleSidebarProps>> = ({
  label,
  className,
  border,
  PreIcon,
  onClick, 
  value
}) => {
  return (
    <div className={`group-sidebar-wrapper ${className}`} >
      <div className={`group-sidebar-label ${border ? 'shadow-border' : ''}`} onClick={() => { onClick && onClick(value)}}>
        <div className="group-sidebar-label-pre">
          {PreIcon}
          <div className="group-sidebar-label-pre-label">{label}</div>
        </div>
        <PlusOutlined style={{ fontSize: '12px' }} className={`${!border?'group-sidebar-label-pre-icon':''}`}/> 
      </div>
    </div>
  );
};

