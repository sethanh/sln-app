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
  value,
  style
}) => {
  const navigate = useNavigate();

  const onNavigate = (path?: string) => {
    if(onClick)
    {
      return onClick(path);
    }
    navigate(path || '');
  } 
  
  return (
    <div className={`sent_group-sidebar-wrapper ${className}`} style={style}>
      <div className={`sent_group-sidebar-label ${border ? 'shadow-border' : ''}`} onClick={() => { onNavigate(value)}}>
        <div className="sent_group-sidebar-label-pre">
          {PreIcon}
          <div className="sent_group-sidebar-label-pre-label">{label}</div>
        </div>
        <PlusOutlined style={{ fontSize: '12px' }} className={`${!border?'sent_group-sidebar-label-pre-icon':''}`}/> 
      </div>
    </div>
  );
};

