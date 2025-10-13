import { useAtom } from "jotai";
import { DrawerState, globalDrawerState } from "../drawerAtom";

const defaultDrawerState: DrawerState = {
  isOpen: false,
  titleTransCode: undefined,
  titleAction: undefined,
  content: null,
  footer: null,
  onClose: () => {},
  subtitle: undefined,
  hideHeader: false,
};

export const useGlobalDrawer = () => {
  const [globalDrawer, setGlobalDrawer] = useAtom(globalDrawerState);

  const resetGlobalDrawerState = () => {
    setGlobalDrawer({ ...defaultDrawerState });
  };

  return { globalDrawer, setGlobalDrawer, resetGlobalDrawerState };
};
