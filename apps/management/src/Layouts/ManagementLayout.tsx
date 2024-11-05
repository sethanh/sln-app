import React, { useState } from 'react';
import { Button, MainLayout } from '@my-monorepo/ui'
import { ManagementSidebar } from './Sidebars'
import { ManagementContent } from './Contents'
import './Layout.css'
import { ThemeContext, themeInit } from '../Contexts';

export const ManagementLayout: React.FC = () => {
    const [theme, setTheme] = useState("light");
    const { context: createTheme, context_use: useTheme } = themeInit(theme);

    const onClick = () => {
        if(theme === "light") {
            setTheme("dark");
        }
        else {
            setTheme("light");
        }
    }
    return (
        <ThemeContext Context={createTheme}>
            <MainLayout
        sidebar={<ManagementSidebar/>}
        content={<ManagementContent/>}
        sidebarClassName={`management-sidebar ${useTheme}-theme`}
        contentClassName={`management-content ${useTheme}-theme`}
            />
            <Button label="Change theme" onClick={onClick} />
        </ThemeContext>
  );
};