export interface AccountModel
{
    id: number
    name: string
    googleAccount?: GoogleAccountModel
}

export interface GoogleAccountModel
{
    id: number
    email?: string
    picture?: string 
}