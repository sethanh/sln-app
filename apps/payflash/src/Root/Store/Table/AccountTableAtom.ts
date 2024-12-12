import { genericAtom } from "@my-monorepo/utils";
import { IAccountProps } from "@my-monorepo/payflash/Pages";

export const AccountTableAtom = genericAtom<IAccountProps>({ accountType: '', accountName: '', accountBalance: '' });