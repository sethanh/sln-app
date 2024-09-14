import React, { FC } from 'react';
import { ISidebarItemProps } from './ISidebar';


export const SidebarItem: FC<ISidebarItemProps> = ({ label, onClick, Icon, value }) => {
  return (
    <div className="sidebar-item" onClick={ () => onClick && onClick(value)}>
      {Icon}
      <div>{label}</div>
    </div>
  );
};

