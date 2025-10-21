export interface AccountModel
{
    id: string
    name: string
    googleAccount?: GoogleAccountModel
}

export interface GoogleAccountModel
{
    id: string
    email?: string
    picture?: string 
}