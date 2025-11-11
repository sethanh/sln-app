import { List, Skeleton, Spin } from "antd";
import VirtualList, { ListRef } from "rc-virtual-list";

export interface ListCommonProps<T> {
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
    loadingInitial?: boolean;
    loadingMore?: boolean;
    hasMore?: boolean;
    listClassName?: string;
    listStyle?: React.CSSProperties;
    listRef?: React.Ref<ListRef>;
    data?: T[];
    onScroll?: React.UIEventHandler<HTMLElement>;
    height?: number;
    renderItem?: (item: T) => React.ReactNode;
    listItemKey?: string;
}

export const ListCommon: React.FC = <T,>(props: ListCommonProps<T>) => {
    return (
        <List
            className={props.containerClassName}
            style={props.containerStyle}
        >
        {props.loadingInitial ? (
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
                data={props.data || []}
                itemKey={props.listItemKey!}
                {...props}
            >
              {(item) => props.renderItem ? props.renderItem(item) : null}
            </VirtualList>

            {/* Loader dưới */}
            <div style={{ display: "flex", justifyContent: "center", width: "100%", position: "absolute", bottom: 10 }}>
              {props.loadingMore ? (
                <Spin />
              ) : props.hasMore ? (
                <span></span>
              ) : (
                <span style={{ color: "#999", fontSize: 12 }}>Đã hiển thị tất cả</span>
              )}
            </div>
          </>
        )}
      </List>
    )
}