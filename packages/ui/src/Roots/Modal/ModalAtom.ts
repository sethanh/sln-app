import { genericAtom } from "@my-monorepo/utils";

export interface ModalState {
    isOpen?: boolean;
    titleTransCode?: string | JSX.Element | null;
    content?: JSX.Element | null;
    footer?: JSX.Element | null;
    showModalDelete?: boolean;
    showModalConfirm?: boolean;
    showModalFinish?: boolean;
    onOk?: () => void;
    onCancel?: () => void;
    okText?: string;
    cancelText?: string;
    width?: number;
    closeIcon?: JSX.Element | null;
    title?: JSX.Element | null;
    showDivider?: boolean;
    maskClosable?: boolean;
    backgroundColorBtn?: string;
}

export const globalModalState = genericAtom<ModalState | null>(
    {
        isOpen: false,
        titleTransCode: undefined,
        content: null,
        footer: null,
        okText: undefined,
        showModalDelete: false,
        showModalConfirm: false,
        showModalFinish: false,
        closeIcon: undefined,
        title: null,
        showDivider: true,
        maskClosable: false,
    }
)