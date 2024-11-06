import React, { createContext, useContext } from "react";
import { IcontextProvider } from "./IContext";

export function contextInit <T>(initial_value: T) {
    const context = createContext(initial_value);
    return context
}

export const ContextProvider = <T,>({ children, Context 
        } : IcontextProvider<T>) => {

    const value = useContext(Context);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}