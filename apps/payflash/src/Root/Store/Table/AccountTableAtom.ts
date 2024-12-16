import { genericAtom } from "@my-monorepo/utils";
import { IAccountTableProps } from "@my-monorepo/payflash/Pages";

export const AccountTableAtom = genericAtom<IAccountTableProps>({
    ID: "",
    Name: {
        username: "",
        email: "",
    },
    Phone: "",
    Group: "",
    Source: "",
    CreatedOn: new Date(),
});

export const AccountDrawerAtom = genericAtom<boolean>(false);