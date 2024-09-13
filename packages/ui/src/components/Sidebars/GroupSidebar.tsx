import React, { PropsWithChildren, FC, useState } from 'react';
import { IGroupSidebarProps } from './ISidebar';
import { SidebarItem } from './SidebarItem';
import './Sidebar.css'
import { DownOutlined, RightOutlined } from '@ant-design/icons';


export const GroupSidebar: FC<PropsWithChildren<IGroupSidebarProps>> = ({ label, onClick, className, children, sidebarItems }) => {
  const [showItem, setShowItem] = useState(false);
  return (
    <div className={`group-sidebar-wrapper ${className}`} >
      <div className="group-sidebar-label" onClick={() => { setShowItem(!showItem) }}>
        {
          showItem
          &&<DownOutlined style={{ fontSize: '8px' }}/>
          ||<RightOutlined style={{ fontSize: '8px' }}/>
        }
        <div>{label}</div>
      </div>
      {
        showItem && (
          <div className="group-sidebar-item-wrapper">
            {
              sidebarItems?.map((item  , index) => (
                <SidebarItem
                  {...item}
                  onClick={onClick}
                />
              ))
            }
            {children}
          </div>
        )
      }
    </div>
  );
};

