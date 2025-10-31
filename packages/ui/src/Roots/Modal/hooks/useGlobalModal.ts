import { useAtom } from "jotai";
import { globalModalState, ModalState } from "../ModalAtom";

const globalModalStateDefault: ModalState = {
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
};

export const useGlobalModal = () => {
  const [globalModal, setGlobalModal] = useAtom(globalModalState);

  const resetGlobalModal = () => {
    setGlobalModal({ ... globalModalStateDefault });
  };

  return { globalModal, setGlobalModal, resetGlobalModal };
};
