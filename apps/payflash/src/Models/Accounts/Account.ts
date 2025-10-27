import { AccountResponse } from "../Messages"

export interface AccountModel extends AccountResponse
{
    googleAccount?: GoogleAccountModel,
    picture?: string 
}

export interface GoogleAccountModel
{
    id: string
    email?: string
    picture?: string 
}