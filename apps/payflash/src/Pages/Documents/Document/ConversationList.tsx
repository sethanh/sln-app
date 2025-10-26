import React from 'react';
import { FlexBox, TextCommon } from '@my-monorepo/ui';
import { ConversationResponse } from '@my-monorepo/payflash/Models';
import { Avatar } from 'antd';

interface ConversationsProps {
  conversations?: ConversationResponse[];
  onListenConversations?: (conversationId: string) => void;
}

const ConversationList: React.FC<ConversationsProps> = ({ conversations, onListenConversations }) => {
  return (
    <FlexBox gap={12} flex='none'>
      {conversations?.map((item) => (
        <FlexBox
          key={item.id}
          gap={8}
          alignItems="center"
          cursor="pointer"
          onClick={() => onListenConversations?.(item.id)}
        >
          <Avatar.Group>
            {item.accounts?.map((ac, idx) => (
              <Avatar
                key={ac.accountId ?? idx}
                src={ac.account?.googleAccounts?.[0]?.picture || ''}
              />
            ))}
          </Avatar.Group>
          <TextCommon>{item.name}</TextCommon>
        </FlexBox>
      ))}
    </FlexBox>
  );
};

export { ConversationList };
