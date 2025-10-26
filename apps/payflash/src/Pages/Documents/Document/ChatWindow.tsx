/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Avatar, Button, Input, List, message as antdMessage, Skeleton, Spin, Tooltip } from "antd";
import { SendOutlined } from "@ant-design/icons";
import VirtualList from "rc-virtual-list";

type MessageItem = {
  id: string;
  conversationId: string;
  senderId: string;
  name?: string;
  avatar?: string;
  text: string;
  createdAt: string; // ISO
  fromMe?: boolean;
};

type ChatPageResponse = {
  items: MessageItem[];        // DESC: newest -> oldest
  nextBeforeId?: string | null;
};

const CONTAINER_HEIGHT = 600;
const PAGE_SIZE = 20;
const BOTTOM_THRESHOLD = 80;

// ===== Mock current user =====
const ME = {
  id: "me",
  name: "You",
  avatar: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
};

// ===== MOCK APIs: đổi sang API thật của bạn =====
async function fetchMessages(params: { conversationId: string; limit: number; beforeId?: string | null; }): Promise<ChatPageResponse> {
  // GIẢ LẬP: tạo data DESC và nextBeforeId theo cursor
  const { limit, beforeId } = params;
  // build a synthetic stream of 200 messages
  const total = 200;
  const all: MessageItem[] = Array.from({ length: total }, (_, i) => {
    const idx = total - i; // newest idx lớn
    return {
      id: `m-${idx}`,
      conversationId: params.conversationId,
      senderId: idx % 3 === 0 ? ME.id : `u-${idx % 7}`,
      name: idx % 3 === 0 ? ME.name : `User ${idx % 7}`,
      avatar: idx % 3 === 0 ? ME.avatar : "https://i.pravatar.cc/100",
      text: `Mock message #${idx}`,
      createdAt: new Date(Date.now() - idx * 45000).toISOString(),
      fromMe: idx % 3 === 0,
    };
  });
  // DESC
  let q = all;
  if (beforeId) {
    const anchorIdx = q.findIndex(m => m.id === beforeId);
    if (anchorIdx >= 0) q = q.slice(anchorIdx + 1); // cũ hơn anchor
    else q = []; // không có anchor => hết
  }
  const items = q.slice(0, limit);
  const nextBeforeId = items.length === limit ? items[items.length - 1].id : null;
  await new Promise(r => setTimeout(r, 250));
  return { items, nextBeforeId };
}

async function sendMessageAPI(conversationId: string, text: string): Promise<MessageItem> {
  await new Promise(r => setTimeout(r, 180));
  return {
    id: crypto.randomUUID(),
    conversationId,
    senderId: ME.id,
    name: ME.name,
    avatar: ME.avatar,
    text,
    createdAt: new Date().toISOString(),
    fromMe: true,
  };
}

type ChatWindowProps = {
  conversationId: string;
  onClose?: () => void;
  hubUrl?: string;
};

export const ChatWindow: React.FC<ChatWindowProps> = ({ conversationId, onClose}) => {
  const [data, setData] = useState<MessageItem[]>([]);       // DESC (newest → oldest)
  const [nextBeforeId, setNextBeforeId] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const rafIdRef = useRef<number | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef(true);

  // dedupe nhanh theo id
  const idSet = useMemo(() => new Set(data.map(d => d.id)), [data]);

  // ------- load newest page -------
  const reloadLatest = useCallback(async () => {
    try {
      setLoadingInitial(true);
      const page = await fetchMessages({ conversationId, limit: PAGE_SIZE });
      if (!mountedRef.current) return;

      setData(page.items);
      setNextBeforeId(page.nextBeforeId ?? null);
      setHasMore(Boolean(page.nextBeforeId));

      requestAnimationFrame(() => {
        const el = listRef.current;
        if (el) el.scrollTop = 0; // newest on top
      });
    } catch {
      antdMessage.error("Không tải được tin nhắn.");
    } finally {
      if (mountedRef.current) setLoadingInitial(false);
    }
  }, [conversationId]);

  // ------- load older (append bottom) -------
  const loadOlder = useCallback(async () => {
    if (!hasMore || loadingMore || !nextBeforeId) return;
    try {
      setLoadingMore(true);
      const page = await fetchMessages({ conversationId, limit: PAGE_SIZE, beforeId: nextBeforeId });
      if (!mountedRef.current) return;

      // khử trùng lặp đề phòng server trả trùng
      const filtered = page.items.filter(m => !idSet.has(m.id));

      setData(prev => prev.concat(filtered));
      setNextBeforeId(page.nextBeforeId ?? null);
      setHasMore(Boolean(page.nextBeforeId));
    } catch {
      antdMessage.error("Không tải thêm được tin cũ.");
    } finally {
      if (mountedRef.current) setLoadingMore(false);
    }
  }, [conversationId, hasMore, loadingMore, nextBeforeId, idSet]);


  useEffect(() => {
    mountedRef.current = true;
    void reloadLatest();
    return () => {
      mountedRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [reloadLatest]);

  // rAF throttle scroll: chạm đáy thì load cũ
  const onScroll: React.UIEventHandler<HTMLElement> = (e) => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    const target = e.currentTarget;
    rafIdRef.current = requestAnimationFrame(() => {
      const dist = target.scrollHeight - target.scrollTop - target.clientHeight;
      if (dist <= BOTTOM_THRESHOLD) void loadOlder();
    });
  };

  // gửi: prepend top
  const sendMessage = useCallback(async () => {
    const text = draft.trim();
    if (!text || sending) return;

    setSending(true);
    try {
      const temp: MessageItem = {
        id: `temp-${crypto.randomUUID()}`,
        conversationId,
        senderId: ME.id,
        name: ME.name,
        avatar: ME.avatar,
        text,
        createdAt: new Date().toISOString(),
        fromMe: true,
      };
      setData(prev => [temp, ...prev]);
      setDraft("");

      requestAnimationFrame(() => {
        const el = listRef.current;
        if (el) el.scrollTop = 0;
      });

      const saved = await sendMessageAPI(conversationId, text);
      setData(prev => {
        const idx = prev.findIndex(m => m.id === temp.id);
        if (idx >= 0) {
          const clone = prev.slice();
          clone[idx] = saved;
          return clone;
        }
        return [saved, ...prev];
      });
    } catch {
      antdMessage.error("Gửi tin nhắn thất bại");
      setData(prev => prev.filter(m => !m.id.startsWith("temp-")));
    } finally {
      setSending(false);
    }
  }, [conversationId, draft, sending]);

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const renderItem = (m: MessageItem) => (
    <List.Item
      key={m.id}
      style={{
        paddingInline: 12,
        border: "none",
        display: "flex",
        justifyContent: m.fromMe ? "flex-end" : "flex-start",
      }}
    >
      {!m.fromMe && <Avatar src={m.avatar} style={{ marginRight: 8 }} size="large" />}
      <div
        style={{
          maxWidth: 520,
          background: m.fromMe ? "#e6f7ff" : "#fff",
          border: m.fromMe ? "1px solid #91d5ff" : "1px solid #f0f0f0",
          borderRadius: 12,
          padding: "8px 12px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>
          {(m.fromMe ? "Bạn" : m.name) ?? ""} · {new Date(m.createdAt).toLocaleString()}
        </div>
        <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
      </div>
      {m.fromMe && <Avatar src={m.avatar} style={{ marginLeft: 8 }} size="large" />}
    </List.Item>
  );

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: 720,
        border: "1px solid #f0f0f0",
        backgroundColor: "white",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 8 }}>
        <strong>Conversation</strong>
        <div style={{ flex: 1 }} />
        {onClose && <Button onClick={onClose}>Close</Button>}
      </div>

      <List style={{ flex: 1, overflow: "hidden" }}>
        {loadingInitial ? (
          <div style={{ height: CONTAINER_HEIGHT, overflow: "auto", padding: 12 }}>
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
              data={data}              // DESC (newest → oldest)
              height={CONTAINER_HEIGHT}
              itemHeight={72}
              itemKey="id"
              onScroll={onScroll}      // chạm đáy → load older
              ref={(node: any) => {
                // rc-virtual-list nội bộ có scrollRef
                listRef.current = node?.component?.scrollRef ?? null;
              }}
            >
              {(item: MessageItem) => renderItem(item)}
            </VirtualList>

            {/* Loader/hint phía DƯỚI (khu vực tin cũ) */}
            <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
              {loadingMore ? (
                <Spin />
              ) : hasMore ? (
                <span style={{ color: "#999", fontSize: 12 }}>Kéo xuống để tải tin cũ…</span>
              ) : (
                <span style={{ color: "#999", fontSize: 12 }}>Đã hiển thị tất cả tin cũ</span>
              )}
            </div>
          </>
        )}
      </List>

      {/* Footer chat */}
      <div
        style={{
          borderTop: "1px solid #f0f0f0",
          padding: 12,
          background: "#fff",
          display: "flex",
          gap: 8,
          alignItems: "flex-end",
        }}
      >
        <Input.TextArea
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
