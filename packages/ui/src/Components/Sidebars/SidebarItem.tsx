import React from 'react';
import { ISidebarItemProps } from './ISidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextCommon } from '../Typography';


export const SidebarItem: React.FC<ISidebarItemProps> = ({ label, onClick, Icon, path,  style }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname == `/${path}`; 

  const onNavigate = (pathValue?: string) => {
    if(onClick)
    {
      return onClick(pathValue);
    }
    navigate(pathValue || '');
  } 
  
  return (
    <div className={`sidebar-item ${isActive? 'active':''}`} onClick={ () => onNavigate(path)} style={style}>
      {Icon}
      <TextCommon  
        fontWeight={isActive ? 600 : 450}
        fontSize={12}
      >
      {label}
      </TextCommon>
    </div>
  );
};

