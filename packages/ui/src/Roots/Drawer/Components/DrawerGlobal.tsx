import { useAtom } from 'jotai';
import { globalDrawerState } from '../drawerAtom';
import { DrawerCustom } from './DrawerCustom';

export const DrawerGlobal: React.FC = () =>  {
    const [drawerState, setDrawerState] = useAtom(globalDrawerState);
    return (
        <DrawerCustom
            onClose={() => {
                drawerState?.onClose?.();
                setDrawerState({
                    isOpen: false,
                    titleTransCode: undefined,
                    titleAction: undefined,
                    content: null,
                    footer: null,
                    onClose: () => { },
                    subtitle: undefined,
                    hideHeader: false,
                });
            }}
            open={drawerState?.isOpen}
            drawerTitle={drawerState?.titleTransCode}
            drawerSubtitle={drawerState?.subtitle}
            footer={drawerState?.footer}
            hideHeader={drawerState?.hideHeader}
            drawerTitleAction={drawerState?.titleAction}
        >
            {drawerState?.content}
        </DrawerCustom>
    );
};
