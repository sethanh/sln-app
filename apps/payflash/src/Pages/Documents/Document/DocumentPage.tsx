import React, { useEffect, useState } from 'react';
import { ChatWindow } from './ChatWindow';
import { Spin } from 'antd';
import { Block, FlexBox, TextCommon } from '@my-monorepo/ui';
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
        <FlexBox width="100%">
            <FlexBox direction='column' gap={12} width="70%">
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
            
            <Block display="flex" flexDirection='column' width="30%" backgroundColor='white' borderRadius="8px">
                <Block padding="1rem">
                    <TextCommon fontWeight={600} fontSize={24}>
                        Friends List
                    </TextCommon>
                </Block>
            </Block>
        </FlexBox>
    );
};

export { DocumentPage }
