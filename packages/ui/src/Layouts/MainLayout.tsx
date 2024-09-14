import React from 'react';
import './MainLayout.css';

// Define generic types for props
interface LayoutProps<T> {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  content: React.ReactNode;
  extraData?: T;
  headerClassName?: string;
  sidebarClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
}

export const MainLayout = <T,>({ 
    header, 
    sidebar, 
    footer, 
    content, 
    extraData,
    headerClassName,
    sidebarClassName,
    contentClassName,
    footerClassName 
  }: LayoutProps<T>) => {
  return (
    <div className={`main-layout`}>
      {
        header 
        && <header className={`main-header `}>
          {header}
        </header>
      }
      <div className={`main-layout-body`}>
        <div className={`main-sidebar ${sidebarClassName}`}>
          {sidebar}
        </div>
        <div className={`main-content ${contentClassName}`}>
          {content}
        </div>
      </div>
      {
        footer
        && <div className={`main-footer ${footerClassName}`}>
          {footer}
        </div>
      }
    </div>
  );
};
