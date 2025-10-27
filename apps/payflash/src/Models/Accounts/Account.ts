export interface AccountModel
{
    id: string
    name: string
    googleAccount?: GoogleAccountModel,
    picture?: string 
}

export interface GoogleAccountModel
{
    id: string
    email?: string
    picture?: string 
}