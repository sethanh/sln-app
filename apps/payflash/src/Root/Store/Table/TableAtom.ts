import { genericAtom } from "@my-monorepo/utils";
import { IPaymentAccountTableProps } from "@my-monorepo/payflash/Pages";

export const PaymentSettingsTableAtom = genericAtom<IPaymentAccountTableProps>({
    ID: "",
    Name: {
        username: "",
        email: "",
    },
    BankName: {
        name: "",
    },
    BankAccountNumber: "",
    Phone: "",
    Group: "",
    Source: "",
    CreatedOn: new Date(),
});

