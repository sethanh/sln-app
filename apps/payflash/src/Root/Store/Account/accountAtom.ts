import { AccountModel } from '@my-monorepo/payflash/Models';
import {genericAtom}  from '@my-monorepo/utils'


export const currentAccountAtom = genericAtom<AccountModel | null>(null);