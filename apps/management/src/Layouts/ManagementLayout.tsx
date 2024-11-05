<<<<<<< HEAD
import React, { useState } from 'react';
import { Button, MainLayout } from '@my-monorepo/ui'
import { ManagementSidebar } from '@my-monorepo/management'
import { ManagementContent } from '@my-monorepo/management'
import './Layout.css'
import { ThemeContext, themeInit } from '@my-monorepo/management';

export const ManagementLayout: React.FC = () => {
    const [theme, setTheme] = useState("light");
    const { context: createTheme, context_use: useTheme } = themeInit(theme);

=======
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
>>>>>>> master
    const onClick = () => {
        if(theme === "light") {
            setTheme("dark");
        }
        else {
            setTheme("light");
        }
    }
<<<<<<< HEAD
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
=======
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
>>>>>>> master
  );
};