import React from 'react';

import { ModalCustom } from './ModalCustom';
import { useGlobalModal } from '@my-monorepo/payflash/Root/Store/Modal';
import { ModalDelete } from './modal-delete';
import { ModalConfirm } from './modal-confirm';
import { ModalFinish } from './modal-finish';


export const ModalGlobal = () => {
    const {globalModal, resetGlobalModal } = useGlobalModal();

    const onCancel = React.useCallback(() => {
        globalModal?.onCancel?.();
        resetGlobalModal();
    }, [globalModal, resetGlobalModal]);

    if (globalModal?.showModalDelete) {
        return (
            <ModalDelete
                open={globalModal?.isOpen}
                onOk={globalModal.onOk}
                onCancel={onCancel}
                footer={globalModal.footer}
            >
                {globalModal?.content}
            </ModalDelete>
        );
    }

    if (globalModal?.showModalConfirm) {
        return (
            <ModalConfirm
                open={globalModal?.isOpen}
                onOk={globalModal.onOk}
                onCancel={onCancel}
                footer={globalModal.footer}
            >
                {globalModal?.content}
            </ModalConfirm>
        );
    }

    if (globalModal?.showModalFinish) {
        return (
            <ModalFinish
                open={globalModal?.isOpen}
                onOk={globalModal.onOk}
                onCancel={onCancel}
                footer={globalModal.footer}
            >
                {globalModal?.content}
            </ModalFinish>
        );
    }
    const titleModal = globalModal?.titleTransCode;
    return (
        <ModalCustom
            destroyOnClose
            open={globalModal?.isOpen}
            closeIcon={globalModal?.closeIcon}
            title={titleModal}
            onCancel={onCancel}
            cancelText={globalModal?.cancelText}
            okText={globalModal?.okText}
            footer={globalModal?.footer}
            width={globalModal?.width}
            onOk={globalModal?.onOk}
            showDivider={globalModal?.showDivider}
            maskClosable={globalModal?.maskClosable}
            okButtonProps={{
                style: { backgroundColor: globalModal?.backgroundColorBtn, borderColor: globalModal?.backgroundColorBtn }
            }}
        >
            {globalModal?.content}
        </ModalCustom>
    );
};
