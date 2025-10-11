import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from '../Pages';

export const Router = () => {
    const domain = window.location.hostname.split('.')[0];

    return (
        <BrowserRouter>
            <Routes> 
                <Route path='*' element={<HomePage domain={domain} />} />
            </Routes>
        </BrowserRouter>
    );
};