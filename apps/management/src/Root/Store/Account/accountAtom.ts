import {genericAtom}  from '@my-monorepo/utils'

export interface Account {
    id: string;
    name: string;
}

export const currentAccountAtom = genericAtom<Account | null>(null);