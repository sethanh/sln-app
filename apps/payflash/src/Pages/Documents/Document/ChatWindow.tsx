/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, Button, Input, List, message as antdMessage, Skeleton, Spin, Tooltip } from "antd";
import { SendOutlined } from "@ant-design/icons";
import VirtualList from "rc-virtual-list";

interface MessageItem {
  id: string;
  email: string;
  name: string;
  avatar: string;
  text: string;
  createdAt: string; // ISO
  fromMe?: boolean;
}

const CONTAINER_HEIGHT = 600;
const PAGE_SIZE = 20;
const BOTTOM_THRESHOLD = 80; // px coi như chạm đáy

const ME = {
  email: "me@local.dev",
  name: "You",
  avatar: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const makeId = () => Math.random().toString(36).slice(2) + "-" + Date.now().toString(36);

// ============== MOCK APIs (thay bằng API thật) ==============
async function fetchPage(pageIndex: number): Promise<MessageItem[]> {
  // Mặc định API trả DESC (mới → cũ) theo createdAt, id
  const url = `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${pageIndex}&limit=${PAGE_SIZE}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = await res.json();
  const arr: MessageItem[] = (Array.isArray(body) ? body : []).map((u: any, i: number) => ({
    id: `${u.email}-${pageIndex}-${i}`,
    email: u.email,
    name: u.name,
    avatar: u.avatar,
    text: `Hi, I'm ${u.name}. Mock message #${(pageIndex - 1) * PAGE_SIZE + i + 1}`,
    createdAt: new Date(Date.now() - (pageIndex * PAGE_SIZE + i) * 45000).toISOString(),
  }));
  await delay(250);
  return arr;
}

async function sendMessageAPI(text: string): Promise<MessageItem> {
  await delay(200);
  return {
    id: makeId(),
    email: ME.email,
    name: ME.name,
    avatar: ME.avatar,
    text,
    createdAt: new Date().toISOString(),
    fromMe: true,
  };
}
// ============================================================

const ChatWindow: React.FC = () => {
  const [data, setData] = useState<MessageItem[]>([]); // DESC: newest → oldest
  const [page, setPage] = useState(1);                 // trang “cũ hơn” kế tiếp
  const [hasMore, setHasMore] = useState(true);

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const rafIdRef = useRef<number | null>(null);
  const mountedRef = useRef(true);
  const listContainerRef = useRef<HTMLDivElement | null>(null);

  // Lấy trang đầu: newest → oldest (DESC), hiển thị trên cùng trước
  useEffect(() => {
    mountedRef.current = true;
    (async () => {
      try {
        setLoadingInitial(true);
        const first = await fetchPage(1);
        if (!mountedRef.current) return;
        setData(first);
        setPage(2);
        setHasMore(first.length === PAGE_SIZE);

        // cuộn về TOP (vì newest ở đầu, người dùng sẽ xem đầu danh sách)
        requestAnimationFrame(() => {
          const el = listContainerRef.current;
          if (el) el.scrollTop = 0;
        });
      } catch {
        if (!mountedRef.current) return;
        antdMessage.error("Tải dữ liệu thất bại. Vui lòng thử lại.");
      } finally {
        if (mountedRef.current) setLoadingInitial(false);
      }
    })();
    return () => {
      mountedRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Append dữ liệu cũ hơn ở CUỐI danh sách (vì đang DESC)
  const appendOlder = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    try {
      setLoadingMore(true);
    //   const el = listContainerRef.current;
      // giữ vị trí cuộn: khi append ở cuối, vị trí hiện tại không đổi nên không cần tính toán gì thêm
      const next = await fetchPage(page);
      if (!mountedRef.current) return;

      setData(prev => prev.concat(next)); // thêm xuống dưới
      setPage(prev => prev + 1);
      setHasMore(next.length === PAGE_SIZE);
    } catch {
      if (!mountedRef.current) return;
      antdMessage.error("Tải thêm dữ liệu thất bại.");
    } finally {
      if (mountedRef.current) setLoadingMore(false);
    }
  }, [hasMore, loadingMore, page]);

  // rAF throttle onScroll: khi gần đáy → load cũ hơn
  const onScroll: React.UIEventHandler<HTMLElement> = (e) => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    const target = e.currentTarget;
    rafIdRef.current = requestAnimationFrame(() => {
      const distanceToBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
      if (distanceToBottom <= BOTTOM_THRESHOLD) {
        void appendOlder();
      }
    });
  };

  // Gửi tin: prepend lên ĐẦU danh sách (newest ở top)
  const sendMessage = useCallback(async () => {
    const text = draft.trim();
    if (!text || sending) return;

    setSending(true);
    try {
      const temp: MessageItem = {
        id: "temp-" + makeId(),
        email: ME.email,
        name: ME.name,
        avatar: ME.avatar,
        text,
        createdAt: new Date().toISOString(),
        fromMe: true,
      };

      // prepend ngay để thấy trên đầu
      setData(prev => [temp, ...prev]);
      setDraft("");

      // cuộn về TOP để đảm bảo nhìn thấy tin mới
      requestAnimationFrame(() => {
        const el = listContainerRef.current;
        if (el) el.scrollTop = 0;
      });

      const saved = await sendMessageAPI(text);

      // thay temp bằng saved ở đầu
      setData(prev => {
        if (prev.length && prev[0].id === temp.id) {
          const clone = prev.slice();
          clone[0] = saved;
          return clone;
        }
        // nếu vì lý do gì temp không còn là item[0], tìm và thay
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
      // rollback temp
      setData(prev => prev.filter(m => !m.id.startsWith("temp-")));
    } finally {
      setSending(false);
    }
  }, [draft, sending]);

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const renderItem = (item: MessageItem) => (
    <List.Item
      key={item.id}
      style={{
        paddingInline: 12,
        border: "none",
        display: "flex",
        justifyContent: item.fromMe ? "flex-end" : "flex-start",
      }}
    >
      {!item.fromMe && (
        <Avatar
          src={item.avatar}
          style={{ marginRight: 8, alignSelf: "flex-end" }}
          size="large"
        />
      )}
      <div
        style={{
          maxWidth: 520,
          background: item.fromMe ? "#e6f7ff" : "#fff",
          border: item.fromMe ? "1px solid #91d5ff" : "1px solid #f0f0f0",
          borderRadius: 12,
          padding: "8px 12px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>
          {item.fromMe ? "Bạn" : item.name} · {new Date(item.createdAt).toLocaleString()}
        </div>
        <div style={{ whiteSpace: "pre-wrap" }}>{item.text}</div>
      </div>
      {item.fromMe && (
        <Avatar
          src={item.avatar}
          style={{ marginLeft: 8, alignSelf: "flex-end" }}
          size="large"
        />
      )}
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
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }}>
        <strong>Conversation Name</strong>
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
              data={data}              // DESC: newest → oldest
              height={CONTAINER_HEIGHT}
              itemHeight={72}
              itemKey="id"
              onScroll={onScroll}      // chạm đáy → load older
              ref={(node: any) => {
                // rc-virtual-list nội bộ có scrollRef
                listContainerRef.current = node?.component?.scrollRef ?? null;
              }}
            >
              {(item: MessageItem) => renderItem(item)}
            </VirtualList>

            {/* Footer hiển thị loader/hint ở DƯỚI (phần tin cũ) */}
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

      {/* Footer chat (nhập & gửi) */}
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

export { ChatWindow };
