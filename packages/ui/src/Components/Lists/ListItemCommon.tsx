import { List } from "antd";

export interface ListItemCommonProps {
    key: string;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
}

export const ListItemCommon = (props : ListItemCommonProps) => {
    return (
        <List.Item 
            {...props}
        >
            {props.children}
        </List.Item>
    )
}