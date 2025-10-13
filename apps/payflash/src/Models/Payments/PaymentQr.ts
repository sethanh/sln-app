import { PaginationResponse } from "@my-monorepo/ui";

export interface CreatePaymentQr {
  accountNo: string;
  binCode: string;
  amount?: number;
  accountName?: string ;
  description?: string;
}

export interface CreatePaymentQrResponse {
  qrCode: string;
}

export interface PaymentRequestBody {
  id?: number;
  accountNo: string;
  binCode: string;
  accountName?: string ;
  description?: string;
}

export interface PaymentResponse {
  id: number;
  accountNo: string;
  binCode: string;
  accountName?: string ;
  description?: string;
}

export type GetAllPaymentResponse = PaginationResponse<PaymentResponse>


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
