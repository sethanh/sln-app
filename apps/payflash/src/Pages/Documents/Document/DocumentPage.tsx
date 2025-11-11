import React, { useEffect, useRef, useState } from 'react';
import { ChatWindow } from './ChatWindow';
import { Avatar, Spin } from 'antd';
import { Block, ButtonCommon, FlexBox, ListCommon, ListItemCommon, TextCommon } from '@my-monorepo/ui';
import { currentConversation, usePaymentHttpQuery } from '@my-monorepo/payflash/Root';
import { appConstant, urlConstant } from '@my-monorepo/payflash/Constants';
import { AccountConnectionDetailResponse, AccountConnectionGetAllResponse, ConversationResponse, GetAllConversationResponse } from '@my-monorepo/payflash/Models';
import { ConversationList } from './ConversationList';
import { useAtom } from 'jotai';
import { ConnectActionEnum } from '../Connect/Enums';
// import {apiFetch} from '@my-monorepo/utils'

const DocumentPage: React.FC = () => {
    const [, setConversation] = useAtom(currentConversation);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [isSender, setIsSender] = useState(true);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const listRef = useRef<HTMLDivElement | null>(null);

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

    const renderItem = (item: AccountConnectionDetailResponse) => {
        const photoUrl = item.photo?.relativePath ? 
        `${appConstant.apiUrl}/${item.photo.relativePath}` : item.googleAccounts?.[0]?.picture;

        return (
            <ListItemCommon
                key={item.id}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px"
                }}
            >
               <Avatar src={photoUrl} size={48} />
               <FlexBox
                    preset="column-start"
                    padding="1rem"
               >
                    <TextCommon fontWeight={500} fontSize={17}>{item.name}</TextCommon>
                    <TextCommon fontSize={12}>{item.email}</TextCommon>
               </FlexBox>
            </ListItemCommon>
        )
    }

    const { data : requestList, refetch } = usePaymentHttpQuery<AccountConnectionGetAllResponse>({
            url: urlConstant.connection.accountConnectionGetAllUrl,
            method: "GET",
            queryParams: {
                status: ConnectActionEnum.Accepted,
                isSender: isSender,
                pageSize: 200,
                useCountTotal: true
            },
        });
    
    useEffect(() => {
        refetch();
    }, [isSender]);

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

                <ListCommon
                    containerStyle={{ 
                        display: "flex", 
                        flexDirection: "column", 
                    }}
                    containerClassName="friend-list-container"
                    data={requestList?.items || []}
                    loadingInitial={loadingInitial}
                    loadingMore={loadingMore}
                    hasMore={hasMore}
                    renderItem={renderItem}
                    listItemKey="id"
                    listRef={() => { listRef.current = document.querySelector('.rc-virtual-list-holder'); }}
                />
            </Block>
        </FlexBox>
    );
};

export { DocumentPage }
