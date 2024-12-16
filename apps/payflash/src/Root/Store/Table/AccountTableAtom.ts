import { genericAtom } from "@my-monorepo/utils";
import { IAccountProps } from "@my-monorepo/payflash/Pages";

export const AccountTableAtom = genericAtom<IAccountProps>({
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