import { PaginationResponse } from "@my-monorepo/ui";

export interface CreateContact {
  id?: string;
  name?: string;
  job?: string;
  email?: string;
  PhoneNumber?: string;
  photoId?: string;
  profileName?: string;
  socialContacts?: SocialContactResponse[];
}

export interface ContactResponse {
  id?: string;
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
  id?: string;
  fileName?: string;
  relativePath?: string;
  size?: number;
  contentType?: string;
}

export interface SocialContactResponse {
  id?: string;
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
  Youtube = 6,
  Linkedin = 7
}