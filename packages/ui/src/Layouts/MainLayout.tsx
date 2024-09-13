import React from 'react';
import './MainLayout.css';

// Define generic types for props
interface LayoutProps<T> {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  footer: React.ReactNode;
  content: React.ReactNode;
  extraData?: T; // Optional extra data of generic type
}

export const MainLayout = <T,>({ header, sidebar, footer, content, extraData }: LayoutProps<T>) => {
  return (
    <div className="main-layout">
      <header className="main-header">
        {header}
      </header>
      <div className='main-layout-body'>
        <div className="main-sidebar">
          {sidebar}
        </div>
        <div className="main-content">
          {content}
        </div>
      </div>
      <footer className="main-footer">
        {footer}
      </footer>
    </div>
  );
};
