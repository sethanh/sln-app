/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Avatar, Button, Input, List, message as antdMessage, Skeleton, Spin, Tooltip, Flex } from "antd";
import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import VirtualList from "rc-virtual-list";
import { ChatMessageResponse, GetAllChatMessageResponse } from "@my-monorepo/payflash/Models";
import { currentAccountAtom, currentConversation, usePaymentHttpCommand } from "@my-monorepo/payflash/Root";
import { appConstant, urlConstant } from "@my-monorepo/payflash/Constants";
import { useAtom } from "jotai";
import { messageEvents } from "@my-monorepo/payflash/Events";
import { FlexBox, TextCommon } from "@my-monorepo/ui";
import "./Document.css"
import { TextAreaRef } from "antd/es/input/TextArea";

const CONTAINER_HEIGHT = 600;
const BOTTOM_THRESHOLD = 80;

type ChatWindowProps = {
  conversationId: string;
  onClose?: () => void;
  hubUrl?: string;
};

export const ChatWindow: React.FC<ChatWindowProps> = ({ conversationId, onClose }) => {
  const [account] = useAtom(currentAccountAtom);
  const [conversation] = useAtom(currentConversation);

  const [data, setData] = useState<ChatMessageResponse[]>([]); // DESC: newest → oldest
  const [nextBeforeId, setNextBeforeId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const { mutateAsync: chatGetAllAsync } = usePaymentHttpCommand<GetAllChatMessageResponse>({});
  const { mutateAsync: chatDetailAsync } = usePaymentHttpCommand<ChatMessageResponse>({});
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const rafIdRef = useRef<number | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef(false);

  const inputRef = useRef<TextAreaRef | null>(null);

  // Dedupe theo id để tránh trùng tin nhắn
  const idSet = useMemo(() => new Set(data.map((d) => d.id)), [data]);

  // ✅ Load newest page (khi mở conversation)
  const reloadLatest = useCallback(async () => {
    setLoadingInitial(true);
    try {
      const page = await chatGetAllAsync({
        url: urlConstant.message.chatMessageUrl,
        requestOptions: {
          method: "GET",
          queryParams: {
            page: 1,
            pageSize: 10,
            conversationId,
          },
        },
      });

      if (!mountedRef.current) return;

      const items = page?.items || [];
      setData(items);
      const lastMessage = items[items.length - 1];
      setNextBeforeId(lastMessage?.id ?? null);
      setHasMore(Boolean(lastMessage?.id));

      // Cuộn lên đầu (vì newest nằm trên)
      requestAnimationFrame(() => {
        const el = listRef.current;
        if (el) el.scrollTop = 0;
      });
    } catch (err) {
      antdMessage.error("Không tải được tin nhắn.");
    } finally {
      if (mountedRef.current) setLoadingInitial(false);
    }
  }, [conversationId, chatGetAllAsync]);

  // ✅ Load older messages (lazy load phía dưới)
  const loadOlder = useCallback(async () => {
    if (!hasMore || loadingMore || !nextBeforeId) return;
    setLoadingMore(true);
    try {
      const page = await chatGetAllAsync({
        url: urlConstant.message.chatMessageUrl,
        requestOptions: {
          method: "GET",
          queryParams: {
            page: 1,
            pageSize: 10,
            conversationId,
            beforeId: nextBeforeId,
          },
        },
      });

      if (!mountedRef.current) return;

      const filtered = (page?.items || []).filter((m) => !idSet.has(m.id));
      setData((prev) => prev.concat(filtered));
      const lastMessage = filtered[filtered.length - 1];
      setNextBeforeId(lastMessage?.id ?? null);
      setHasMore(Boolean(lastMessage?.id));
    } catch (err) {
      antdMessage.error("Không tải thêm được tin cũ.");
    } finally {
      if (mountedRef.current) setLoadingMore(false);
    }
  }, [conversationId, hasMore, loadingMore, nextBeforeId, chatGetAllAsync, idSet]);

  // ✅ Chỉ load 1 lần khi conversationId đổi (tránh gọi API liên tục)
  useEffect(() => {
    mountedRef.current = true;
    void reloadLatest();
    return () => {
      mountedRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) return;

    const listen = messageEvents.refetchMessage.listen((dataMessage) => {
      if (!dataMessage) return;
      const hasMessage = data.find(c => dataMessage.messageId === c.id);
      if (hasMessage) return;

      const messageValue = {
        id: dataMessage?.messageId,
        message: dataMessage?.message,
        conversationId,
        creationTime: dataMessage.creationTime,
        accountId: dataMessage.accountId
      } as ChatMessageResponse;

      setData((prev) => [messageValue, ...prev]);
    });

    return () => {
      listen();
    };
  }, [conversationId, data]);

  // Scroll handler — chạm đáy thì load thêm tin cũ
  const onScroll: React.UIEventHandler<HTMLElement> = (e) => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    const target = e.currentTarget;
    rafIdRef.current = requestAnimationFrame(() => {
      const dist = target.scrollHeight - target.scrollTop - target.clientHeight;
      if (dist <= BOTTOM_THRESHOLD) void loadOlder();

    });
  };

  const sendMessage = useCallback(async () => {
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);

    try {

      const response = await chatDetailAsync({
        url: urlConstant.message.chatMessageUrl,
        requestOptions: {
          method: "POST",
          queryParams: {
            page: 1,
            pageSize: 10,
          },
          body: {
            accountId: account?.id ?? "",
            conversationId,
            message: text,
          }
        },
      });

      if (response) {
        setDraft("");
        return requestAnimationFrame(() => {
          inputRef.current?.focus();
          const el = listRef.current;
          if (el) el.scrollTop = 0;
        });
      }

      antdMessage.error("Gửi tin nhắn thất bại.");
    } catch (err) {
      antdMessage.error("Gửi tin nhắn thất bại.");
    } finally {
      setSending(false);
    }
  }, [conversationId, draft, sending, account?.id]);

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const renderItem = (m: ChatMessageResponse) => {
    const isMine = m.accountId === account?.id;
    const accountMessage = conversation?.accounts?.find((c) => c.accountId === m.accountId)?.account;
    const avatar = accountMessage?.photo ? `${appConstant.apiUrl}/${accountMessage.photo?.relativePath}` : accountMessage?.googleAccounts?.[0]?.picture;

    return (
      <List.Item
        key={m.id}
        style={{
          border: "none",
          display: "flex",
          justifyContent: isMine ? "flex-end" : "flex-start",
          flex: 1,
          padding: "8px 12px",
        }}
      >
        {!isMine && <Avatar src={avatar} size="large" />}
        <div
          style={{
            background: isMine ? "#e6f7ff" : "#fff",
            border: isMine ? "1px solid #91d5ff" : "1px solid #f0f0f0",
            borderRadius: 12,
            padding: "8px 12px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            gap: 2,
          }}
        >
          <TextCommon>
              <TextCommon color="#999" fontSize={10}>{`${isMine ? "Bạn" : accountMessage?.name} • `}</TextCommon>
              <TextCommon color="#999" fontSize={8}>  {new Date(m?.creationTime || "").toLocaleString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                }
              )}</TextCommon>
          </TextCommon>
          <div style={{ whiteSpace: "pre-wrap" }}>{m.message}</div>
        </div>
      </List.Item>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        border: "1px solid #f0f0f0",
        backgroundColor: "white",
        borderRadius: "12px",
      }}
    >
      {/* Header */}
      <FlexBox padding='8px 12px' gap={8} justifyContent='space-between' borderBottom='1px solid #f0f0f0' flex='none'>
        <FlexBox gap={8} alignItems='center'>
           <Avatar.Group>
          {conversation?.accounts?.map((ac, idx) => (
            <Avatar
              key={ac.accountId ?? idx}
              src={ac.account?.photo ? `${appConstant.apiUrl}/${ac.account?.photo.relativePath}` : ac.account?.googleAccounts?.[0]?.picture || ''}
            />
          ))}
        </Avatar.Group>
        <TextCommon>
          {conversation?.name}
        </TextCommon>
        </FlexBox>
        {onClose &&<Button shape='circle' icon={ <CloseOutlined/>} onClick={onClose}/>}
      </FlexBox>
      <List
        className="chat-window"
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}>
        {loadingInitial ? (
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <Skeleton.Avatar active size="large" />
                <div style={{ flex: 1 }}>
                  <Skeleton active paragraph={{ rows: 1 }} title={{ width: "40%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <VirtualList
              className="virtual-list"
              data={data}
              itemKey="id"
              height={CONTAINER_HEIGHT}
              onScroll={onScroll}
              ref={(node: any) => {
                listRef.current = node?.component?.scrollRef ?? null;
              }}
            >
              {(item: ChatMessageResponse) => renderItem(item)}
            </VirtualList>

            {/* Loader dưới */}
            <div style={{ display: "flex", justifyContent: "center", width: "100%", position: "absolute", bottom: 10 }}>
              {loadingMore ? (
                <Spin />
              ) : hasMore ? (
                <span></span>
              ) : (
                <span style={{ color: "#999", fontSize: 12 }}>Đã hiển thị tất cả tin cũ</span>
              )}
            </div>
          </>
        )}
      </List>

      {/* Footer */}
      <div
        style={{
          padding: '0px 12px 12px 12px',
          background: "#fff",
          display: "flex",
          gap: 8,
          alignItems: "flex-end",
        }}
      >
        <Input.TextArea
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          autoSize={{ minRows: 1, maxRows: 6 }}
          placeholder="Nhập tin nhắn… (Enter để gửi, Shift+Enter để xuống dòng)"
          disabled={sending}
        />
        <Tooltip title="Gửi (Enter)">
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={sendMessage}
            loading={sending}
            disabled={!draft.trim()}
          />
        </Tooltip>
      </div>
    </div>
  );
};
