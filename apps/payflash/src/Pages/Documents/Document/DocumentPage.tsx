import React, { useState } from 'react';
import { ChatWindow } from './ChatWindow';
import { Spin } from 'antd';
import { FlexBox, TextCommon } from '@my-monorepo/ui';
import { currentConversation, usePaymentHttpQuery } from '@my-monorepo/payflash/Root';
import { urlConstant } from '@my-monorepo/payflash/Constants';
import { GetAllConversationResponse } from '@my-monorepo/payflash/Models';
import { ConversationList } from './ConversationList';
import { useAtom } from 'jotai';
// import {apiFetch} from '@my-monorepo/utils'

const DocumentPage: React.FC = () => {
    const [, setConversation] = useAtom(currentConversation);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

    const { data: conversations, isLoading } = usePaymentHttpQuery<GetAllConversationResponse>({
            url: urlConstant.conversation.conversationUrl,
            method: "GET",
            queryParams: {
                pageSize: 200,
                useCountTotal: true
            }
        }
    );

    const onSelectedConversationId=(id: string | null)=>{
        if(id == null){ setConversation(null)}
        if(id != null){setConversation({id: id})}
        setSelectedConversationId(id);
    }

    return (
        <FlexBox direction='column' gap={12}>
            <TextCommon fontWeight={600} fontSize={24}>
                Message Room
            </TextCommon>
            <Spin spinning={isLoading}>
                 {conversations?.items?<ConversationList conversations={conversations.items}  onListenConversations={onSelectedConversationId}/>: null}
            </Spin>
            {
                selectedConversationId
                ?<ChatWindow 
                    conversationId={selectedConversationId}
                    onClose={() => onSelectedConversationId(null)}
                />
                :<TextCommon color="#999">Chọn một phòng để bắt đầu chat…</TextCommon>
            }
        </FlexBox>
    );
};

export { DocumentPage }
