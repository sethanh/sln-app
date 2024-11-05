import React, { createContext, useContext } from "react";
<<<<<<< HEAD

export function contextInit <T>(initialValue: T) {
    const context = createContext(initialValue);
    const context_use = useContext(context);
    return { context, context_use };
}
export const ContextProvider = <T,>({ children, initialValue, Context 
        } : { children?: React.ReactNode; initialValue: T, Context : React.Context<T> }) => {

    return (
        <Context.Provider value={initialValue}>
=======
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
>>>>>>> master
            {children}
        </Context.Provider>
    )
}
