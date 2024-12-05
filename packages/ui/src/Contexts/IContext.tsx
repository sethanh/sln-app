export interface IContextInit<T> {
    value: T
    setValue: React.Dispatch<React.SetStateAction<T>>
}

export interface IContextProvider<T>{
    Context: React.Context<IContextInit<T>>
    children?: React.ReactNode

}