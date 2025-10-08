import { StringDecoder } from "string_decoder";

export interface CreatePaymentQr {
  accountNo: string;
  binCode: string;
  amount?: number;
  accountName?: string ;
  description?: StringDecoder;
}

export interface CreatePaymentQrResponse {
  qrCode: string;
}


export interface BankResponse {
  items: BankInfoResponse[];
}

export interface BankInfoResponse {
  id: number;
  name?: string;
  code?: string;
  bin?: string;
  shortName?: string;
  logo?: string;
  transferSupported: number;
  lookupSupported: number;
  short_name?: string;
  support: number;
  isTransfer: number;
  swift_code?: string;
}
