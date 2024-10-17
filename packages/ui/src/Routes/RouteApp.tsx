import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { IRouteApp } from './IRouteApp';

export const RouteApp: React.FC<IRouteApp> = ({ routes }) => {
    return (
        <Routes>
            {
                routes?.map((item, index) => (
                    <Route
                        path={item.path}
                        element={item.page}
                        key={index}
                    />
                ))
            }
        </Routes>
    );
};
