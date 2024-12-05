import { TestContext } from '@my-monorepo/management/Contexts';
import { Button } from '@my-monorepo/ui';
import React, { useContext } from 'react';

const ObjectivePage: React.FC = () => {
    const {value: theme, setValue: setTheme} = useContext(TestContext);
    return (
        <div>
            {theme}
            <Button label="Change Theme" onClick={() => setTheme(theme === "light" ? "dark" : "light")} />
        </div>
    );
};

export { ObjectivePage }
