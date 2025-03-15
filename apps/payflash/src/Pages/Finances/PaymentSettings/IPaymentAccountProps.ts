export interface PaymentAccountGeneralInformationProps {
    bankName: string;
    bankAccountNumber: string;
    bankCode?: string;
}

export interface PaymentAccountAdditionalInformationProps {
    bankGroup?: string;
    notes?: string;
}

export interface PaymentAccountProps {
    generalInformation: PaymentAccountGeneralInformationProps;
    additionalInformation: PaymentAccountAdditionalInformationProps;
}
