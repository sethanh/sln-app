import React, { PropsWithChildren, FC, useState } from 'react';
import { IGroupSidebarProps } from './ISidebar';
import { SidebarItem } from './SidebarItem';
import './Sidebar.css'
import { DownOutlined, RightOutlined } from '@ant-design/icons';


export const GroupSidebar: FC<PropsWithChildren<IGroupSidebarProps>> = ({
  label,
  className,
  children,
  sidebarItems,
  border,
  Icon,
  defaultShowItem
}) => {
  const [showItem, setShowItem] = useState(defaultShowItem || false);
  return (
    <div className={`group-sidebar-wrapper ${className}`} >
      <div className={`group-sidebar-label ${border ? 'shadow-border' : ''}`} onClick={() => { setShowItem(!showItem) }}>
        <div className="group-sidebar-label-pre">
          {Icon}
          <div className="group-sidebar-label-pre-label">{label}</div>
        </div>
        {
          showItem
          && <DownOutlined style={{ fontSize: '12px' }} />
          || <RightOutlined style={{ fontSize: '12px' }} className={`${!border?'group-sidebar-label-pre-icon':''}`}/>
        }
      </div>
      {
        showItem && (
          <div className="group-sidebar-item-wrapper">
            {
              sidebarItems?.map((item, index) => (
                <SidebarItem
                  {...item}
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
