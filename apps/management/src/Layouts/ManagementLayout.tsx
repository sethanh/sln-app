import React, { useState } from 'react';
import { Button, MainLayout } from '@my-monorepo/ui'
import { ManagementSidebar } from '@my-monorepo/management'
import { ManagementContent } from '@my-monorepo/management'
import './Layout.css'
import { ThemeContext, themeInit } from '@my-monorepo/management';

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
        <ThemeContext initialValue={theme} Context={createTheme}>
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