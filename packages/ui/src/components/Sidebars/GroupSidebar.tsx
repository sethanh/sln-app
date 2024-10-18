import React, { PropsWithChildren, FC, useState } from 'react';
import { IGroupSidebarProps, ISidebarItemProps } from './ISidebar';
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
  defaultShowItem,
  style
}) => {
  const [showItem, setShowItem] = useState(defaultShowItem || false);

  return (
    <div className={`sent_group-sidebar-wrapper ${className}`} style={style}>
      <div className={`sent_group-sidebar-label ${border ? 'shadow-border' : ''}`} onClick={() => { setShowItem(!showItem) }}>
        <div className="sent_group-sidebar-label-pre">
          {Icon}
          <div className="sent_group-sidebar-label-pre-label">{label}</div>
        </div>
        {
          showItem
          && <DownOutlined style={{ fontSize: '12px' }} />
          || <RightOutlined style={{ fontSize: '12px' }} className={`${!border?'sent_group-sidebar-label-pre-icon':''}`}/>
        }
      </div>
      {
        showItem && (
          <div className="sent_group-sidebar-item-wrapper">
            {
              sidebarItems?.map((item, index) => (
                <SidebarItem
                  {...item}
                  key={index}
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

