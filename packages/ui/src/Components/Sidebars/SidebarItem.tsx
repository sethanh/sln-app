import React from 'react';
import { ISidebarItemProps } from './ISidebar';
import { useNavigate } from 'react-router-dom';
import { TextCommon } from '../Typography';


export const SidebarItem: React.FC<ISidebarItemProps> = ({ label, onClick, Icon, path,  style }) => {
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
      <TextCommon fontWeight={450} fontSize={12} textAlign='end'>{label}</TextCommon>
    </div>
  );
};

