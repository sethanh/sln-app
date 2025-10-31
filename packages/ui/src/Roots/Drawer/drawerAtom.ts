import { genericAtom } from "@my-monorepo/utils";

export interface DrawerState {
    isOpen?: boolean;
    titleTransCode?: React.ReactNode;
    titleAction?: React.ReactNode;
    content?: JSX.Element | null;
    footer?: JSX.Element | null;
    onClose?: () => void;
    subtitle?: React.ReactNode;
    hideHeader?: boolean;
    submitText?: string;
}


export const globalDrawerState = genericAtom<DrawerState | null>(
    {
        isOpen: false,
        titleTransCode: undefined,
        titleAction: undefined,
        content: null,
        footer: null,
        onClose: () => { },
        subtitle: undefined,
        hideHeader: false,
    }
);