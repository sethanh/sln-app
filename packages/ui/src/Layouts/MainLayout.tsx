import React, { useState } from 'react';
import './MainLayout.css';
import { IStyle } from '../Components/Roots/IRoots';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

interface LayoutProps<T> extends IStyle {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  content: React.ReactNode;
  extraData?: T;
  headerClassName?: string;
  sidebarClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  iconMenu?: React.ReactNode;
}

export const MainLayout = <T,>({
  header,
  sidebar,
  footer,
  content,
  headerClassName,
  sidebarClassName,
  contentClassName,
  footerClassName,
  style,
  iconMenu
}: LayoutProps<T>) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="sent_main-layout" style={style}>
      {/* Header */}
      {header && (
        <header className={`sent_main-header ${headerClassName || ''}`}>
          <Button
            className="sent_main-menu-btn"
            onClick={toggleSidebar}
            icon={iconMenu ? iconMenu : <MenuOutlined />}
          />
          {header}
        </header>
      )}

      {/* Body */}
      <div className="sent_main-layout-body">
        <div
          className={`sent_main-sidebar ${sidebarOpen ? 'open' : ''} ${sidebarClassName || ''}`}
        >
          {sidebar}
        </div>
        <div
          className={`sent_main-content ${contentClassName || ''}`}
          onClick={() => sidebarOpen && setSidebarOpen(false)} // click ngoài thì đóng sidebar
        >
          {content}
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div className={`sent_main-footer ${footerClassName || ''}`}>
          {footer}
        </div>
      )}
    </div>
  );
};
