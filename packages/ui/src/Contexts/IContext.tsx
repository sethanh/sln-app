export interface IContextProvider<T>{
    Context: React.Context<T>
    children?: React.ReactNode
}