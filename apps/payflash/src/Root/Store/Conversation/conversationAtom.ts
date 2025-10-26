import { ConversationAccountResponse } from '@my-monorepo/payflash/Models';
import { genericAtom } from '@my-monorepo/utils'

export interface ConversationModal {
    id?: string;
    accounts?: ConversationAccountResponse[];
    name?: string;
}

export const currentConversation = genericAtom<ConversationModal | null>(null);