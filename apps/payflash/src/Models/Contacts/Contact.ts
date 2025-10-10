export interface CreateContact {
  id?: number;
  name?: string;
  job?: string;
  email?: string;
  PhoneNumber?: string;
  photoId?: string;
}

export interface CreateContactResponse {
  id?: number;
  name?: string;
  job?: string;
  email?: string;
  PhoneNumber?: string;
  photoId?: string;
  photo?: PhotoGetDetailResponse
}

export interface PhotoGetDetailResponse
{
    id ?: number;
    fileName ?: string;
    relativePath ?: string;
    size ?: number;
    contentType ?: string;
}