import React, { useContext } from "react";
import { IContextProvider } from "./IContext";

export function contextInit <T>(initial_value: T) {
    const context = React.createContext(initial_value);
    return context
}

export const ContextProvider = <T,>({ children, Context  } : IContextProvider<T>) => {

    const value = useContext(Context);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}
