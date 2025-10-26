import React, { useEffect, useState } from 'react';
import { ChatWindow } from './ChatWindow';
import { Spin } from 'antd';
import { FlexBox, TextCommon } from '@my-monorepo/ui';
import { currentConversation, usePaymentHttpQuery } from '@my-monorepo/payflash/Root';
import { urlConstant } from '@my-monorepo/payflash/Constants';
import { ConversationResponse, GetAllConversationResponse } from '@my-monorepo/payflash/Models';
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

    const onSelectedConversationId=(item: ConversationResponse | null)=>{
        if(item == null){ setConversation(null)}
        if(item != null){setConversation({
            id: item.id,
            accounts: item.accounts,
            name: item.name
        })}
        setSelectedConversationId(item?.id || null);
    }

    useEffect(() => {
        return () => {
            onSelectedConversationId(null);
        };
    }, []);

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
