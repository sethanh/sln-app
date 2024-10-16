import React, { FC } from 'react';
import { ISidebarItemProps } from './ISidebar';
import { useNavigate } from 'react-router-dom';


export const SidebarItem: FC<ISidebarItemProps> = ({ label, onClick, Icon, path: value }) => {
  const navigate = useNavigate();

  const onNavigate = (path?: string) => {
    if(onClick)
    {
      return onClick(path);
    }
    navigate(path || '');
  } 
  
  return (
    <div className="sidebar-item" onClick={ () => onNavigate(value)}>
      {Icon}
      <div>{label}</div>
    </div>
  );
};

