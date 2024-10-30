import React, { createContext, useContext } from "react";

export function contextInit <T>(initialValue: T) {
    const context = createContext(initialValue);
    const context_use = useContext(context);
    return { context, context_use };
}
export const ContextProvider = <T,>({ children, initialValue, Context 
        } : { children?: React.ReactNode; initialValue: T, Context : React.Context<T> }) => {

    return (
        <Context.Provider value={initialValue}>
            {children}
        </Context.Provider>
    )
}
