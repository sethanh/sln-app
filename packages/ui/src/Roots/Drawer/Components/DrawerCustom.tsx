import './DrawerCustom.css';
import { Drawer, DrawerProps } from 'antd';
import React from 'react';
import { HeaderDrawer } from './HeaderDrawer';
import { FooterDrawer } from './FooterDrawer';

interface DrawerCustomProps extends DrawerProps {
    drawerTitle?: React.ReactNode;
    drawerTitleAction?: React.ReactNode;
    drawerSubtitle?: React.ReactNode;
    hideHeader?: boolean;
    footer?: React.ReactNode;
}

export const DrawerCustom = (props: DrawerCustomProps) => {

    return (
        <Drawer
            className={props.hideHeader ? 'hideHeader' : ''}
            destroyOnClose
            id='drawerCustom'
            width='max-content'
            title={props.drawerTitle ? <HeaderDrawer
                onClose={props.onClose}
                drawerTitle={props.drawerTitle}
                drawerSubtitle={props.drawerSubtitle}
                drawerTitleAction={props.drawerTitleAction}
            /> : null}
            onClose={props.onClose}
            open={props.open}
            placement='right'
            closable={false}
            footer={props?.footer || <FooterDrawer onClose={props.onClose}/>}
        >
            {props.children}
        </Drawer>
    );
};
