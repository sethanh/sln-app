import { PaginationResponse } from "@my-monorepo/ui";
import { AccountResponse } from "../Messages";

export enum AccountConnectionStatus {
    Wait = 0,
    Accepted = 1,
    Rejected = 2,
    Canceled = 3
}
export interface AccountConnectionSearchRequest {
    email: string;
}

export type AccountGetAllSearchResponse = PaginationResponse<AccountResponse>;

export interface AccountConnectionRequest {
    accountRequestId?: string;
    accountAcceptId?: string;
}

export type  AccountConnectionGetAllResponse = PaginationResponse<AccountConnectionResponse>;

export interface AccountConnectionResponse {
    id: string;
    accountRequestId: string;
    accountAcceptId: string;
    status: AccountConnectionStatus;
    accountRequest?: AccountResponse;
    accountAccept?: AccountResponse;
}

export interface AccountConnectionUpdateRequest {
    id: string;
    status: number;
}

export interface AccountConnectionUpdateResponse {
    id: string;
    status: number;
}

export interface AccountConnectionDetailResponse extends AccountResponse {
    connectionId?: string;
}

