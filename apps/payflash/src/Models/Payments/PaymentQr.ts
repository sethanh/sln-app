import { StringDecoder } from "string_decoder";

export interface CreatePayment {
  accountNo: string;
  binCode: string;
  amount?: number;
  accountName?: string ;
  description?: StringDecoder;
}

export interface CreatePaymentResponse {
  qrCode: string;
}
