import { PaginationResponse } from "@my-monorepo/ui";

export interface ContactRequestBody {
  id?: number;
  name?: string;
  job?: string;
  email?: string;
  phoneNumber?: string;
  photoId?: string;
  profileName?: string;
  socialContacts?: SocialContactResponse[];
}

export interface ContactResponse {
  id?: number;
  name?: string;
  job?: string;
  email?: string;
  phoneNumber?: string;
  photoId?: string;
  photo?: PhotoGetDetailResponse;
  profileName?: string;
  socialContacts?: SocialContactResponse[];
}


export type GetAllContactResponse = PaginationResponse<ContactResponse>

export interface PhotoGetDetailResponse {
  id?: number;
  fileName?: string;
  relativePath?: string;
  size?: number;
  contentType?: string;
}

export interface SocialContactResponse {
  id?: number;
  link?: string;
  socialType?: string;
}

export enum SocialType {
  Facebook = 0,
  X = 1,
  Github = 2,
  Instagram = 3,
  Spotify = 4,
  Tiktok = 5,
  Youtube = 6
}