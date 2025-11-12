import { PaginationResponse } from "@my-monorepo/ui";
import { AuditModel } from "../Base";
import { PhotoGetDetailResponse } from "../Contacts";

export interface ChatMessageResponse extends AuditModel {
  conversationId: string;
  accountId: string;
  account?: AccountResponse;
  message: string;
}

export type GetAllChatMessageResponse = PaginationResponse<ChatMessageResponse>

export type GetAllConversationResponse = PaginationResponse<ConversationResponse>

export interface ConversationResponse extends AuditModel {
  name?: string;
  accounts?: ConversationAccountResponse[];
  background?: string;
  icon?: string;
}

export interface ConversationAccountResponse extends AuditModel {
  accountId: string;
  conversationId: string;
  account?: AccountResponse;
  conversation?: ConversationResponse;
}

export interface AccountResponse extends AuditModel {
  name: string;
  email: string;
  password?: string;
  photoId?: string;
  rootAccount?: boolean;
  chatMessages?: ChatMessageResponse[];
  conversations?: ConversationAccountResponse[];
  photo?: PhotoGetDetailResponse;
  googleAccounts?: GoogleAccountResponse[];
}

export interface AccountUpdateRequest{
  id: string;
  name: string;
  email: string;
  password: string;
  photoId?: string;
}

export interface GoogleAccountResponse extends AuditModel{
  email?: string;
  picture?: string;
}