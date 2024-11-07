import React, { useContext, useState } from 'react';
import { Button, MainLayout } from '@my-monorepo/ui'
import { ManagementSidebar } from '@my-monorepo/management/Layouts'
import { ManagementContent } from '@my-monorepo/management/Layouts'
import './Layout.css'
import { ThemeContext} from '../Contexts';
import { ContextTheme } from '../Constants';

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