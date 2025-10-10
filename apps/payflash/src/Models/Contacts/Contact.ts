import { PaginationResponse } from "@my-monorepo/ui";

export interface CreateContact {
  id?: number;
  name?: string;
  job?: string;
  email?: string;
  PhoneNumber?: string;
  photoId?: string;
}

export interface ContactResponse {
  id?: number;
  name?: string;
  job?: string;
  email?: string;
  phoneNumber?: string;
  photoId?: string;
  photo?: PhotoGetDetailResponse
}


export type GetAllContactResponse = PaginationResponse<ContactResponse>
export interface PhotoGetDetailResponse
{
    id ?: number;
    fileName ?: string;
    relativePath ?: string;
    size ?: number;
    contentType ?: string;
}