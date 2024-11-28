import {genericAtom}  from '@my-monorepo/utils'

export interface Account {
    id: number;
    name: string;
}

export const currentAccountAtom = genericAtom<Account | null>(null);