import { PhotoGetDetailResponse } from "../Contacts";
import { AccountResponse, GoogleAccountResponse } from "../Messages";

export interface AccountConnectionSearchRequest {
    email: string;
}

export interface AccountConnectionSearchResponse {
    items: AccountResponse[];
}

export interface AccountConnectionRequest {
    accountRequestId: string;
    accountAcceptId: string;
}

export interface AccountConnectionResponse {
    accountRequestId: string;
    accountAcceptId: string;
}

export interface AccountConnectionGetAllResponse {
    items: AccountResponse[];
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
    connectionId: string;
}

