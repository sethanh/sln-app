import { genericAtom } from '@my-monorepo/utils'

export interface ConversationModal {
    id?: string;
}

export const currentConversation = genericAtom<ConversationModal | null>(null);