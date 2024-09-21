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
    <div className={`sent_main-layout`}>
      {
        header 
        && <header className={`sent_main-header`}>
          {header}
        </header>
      }
      <div className={`sent_main-layout-body`}>
        <div className={`sent_main-sidebar ${sidebarClassName}`}>
          {sidebar}
        </div>
        <div className={`sent_main-content ${contentClassName}`}>
          {content}
        </div>
      </div>
      {
        footer
        && <div className={`sent_main-footer ${footerClassName}`}>
          {footer}
        </div>
      }
    </div>
  );
};
