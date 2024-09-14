import React, { PropsWithChildren, FC, useState } from 'react';
import { ISingleSidebarProps } from './ISidebar';
import './Sidebar.css'
import { PlusOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


export const SingleSidebar: FC<PropsWithChildren<ISingleSidebarProps>> = ({
  label,
  className,
  border,
  PreIcon,
  onClick, 
  value
}) => {
  const navigate = useNavigate();

  const onNavigate = (path?: string) => {
    if(onClick)
    {
      onClick(path);
    }
    navigate(path || '');
  } 
  
  return (
    <div className={`group-sidebar-wrapper ${className}`} >
      <div className={`group-sidebar-label ${border ? 'shadow-border' : ''}`} onClick={() => { onNavigate(value)}}>
        <div className="group-sidebar-label-pre">
          {PreIcon}
          <div className="group-sidebar-label-pre-label">{label}</div>
        </div>
        <PlusOutlined style={{ fontSize: '12px' }} className={`${!border?'group-sidebar-label-pre-icon':''}`}/> 
      </div>
    </div>
  );
};

