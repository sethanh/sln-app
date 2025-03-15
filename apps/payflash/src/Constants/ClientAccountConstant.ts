import { PaymentAccountProps } from "@my-monorepo/payflash/Pages";

export const PaymentSettingsClientFormConstant : PaymentAccountProps = {
    generalInformation: {
        bankName: '',
        bankAccountNumber: '',
        bankCode: '',
    },
    additionalInformation: {
        bankGroup: '',
        notes: '',
    }
}