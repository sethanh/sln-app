import React, { FC } from 'react';
import { ISidebarItemProps } from './ISidebar';


export const SidebarItem: FC<ISidebarItemProps> = ({ label, onClick, Icon }) => {
  return (
    <div className="sidebar-item" onClick={onClick}>
      {Icon}
      <div>{label}</div>
    </div>
  );
};

