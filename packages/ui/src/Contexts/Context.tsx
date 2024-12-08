import React, { useContext, useState } from "react";
import { IContextInit, IContextProvider } from "./IContext";

export function contextInit <T>(initial_value: T) {
    const context = React.createContext(initial_value);
    return context
}

export const ContextProvider = <T,>({ children, Context } : IContextProvider<T>) => {
    const {value: initialValue, setValue: setInitialValue} = useContext<IContextInit<T>>(Context);
    const [value, setValue] = useState(initialValue);
    return (
        <Context.Provider value={{value : value, setValue : setValue}}>
            {children}
        </Context.Provider>
    )
}
