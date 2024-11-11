export interface IcontextProvider<T>{
    Context: React.Context<T>
    children?: React.ReactNode
}