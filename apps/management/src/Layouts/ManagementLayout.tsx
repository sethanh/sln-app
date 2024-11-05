import React, { useContext, useState } from 'react';
import { Button, MainLayout } from '@my-monorepo/ui'
import { ManagementSidebar } from './Sidebars/ManagementSidebar'
import { ManagementContent } from './Contents'
import './Layout.css'
import { ThemeContext } from '../Contexts/ThemeContext';
import { ContextTheme } from '../Constants/ContextConstant';

export const ManagementLayout: React.FC = () => {
    const theme_value = useContext(ContextTheme);
    const [theme, setTheme] = useState(theme_value);
    const onClick = () => {
        if(theme === "light") {
            setTheme("dark");
        }
        else {
            setTheme("light");
        }
    }
  return (
    <ThemeContext Context={ContextTheme}>
        <MainLayout
        sidebar={<ManagementSidebar/>}
        content={<ManagementContent/>}
        sidebarClassName={`management-sidebar ${theme}-theme`}
        contentClassName={`management-content ${theme}-theme`}
        />
        <Button label="Change theme" onClick={onClick} />
    </ThemeContext>
  );
};