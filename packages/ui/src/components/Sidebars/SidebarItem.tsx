import React, { FC } from 'react';
import { ISidebarItemProps } from './ISidebar';
import { useNavigate } from 'react-router-dom';


export const SidebarItem: FC<ISidebarItemProps> = ({ label, onClick, Icon, path,  style }) => {
  const navigate = useNavigate();

  const onNavigate = (pathValue?: string) => {
    if(onClick)
    {
      return onClick(pathValue);
    }
    navigate(pathValue || '');
  } 
  
  return (
    <div className="sidebar-item" onClick={ () => onNavigate(path)} style={style}>
      {Icon}
      <div>{label}</div>
    </div>
  );
};

