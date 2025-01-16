import { genericAtom } from "@my-monorepo/utils";
import { PaymentAccountProps } from "@my-monorepo/payflash/Pages";


export const PaymentAccountFormAtom = genericAtom<PaymentAccountProps>({
    generalInformation: {
        bankName: '',
        bankAccountNumber: '',
        bankCode: '',
    },
    additionalInformation: {
        bankGroup: '',
        notes: '',
    }
})
