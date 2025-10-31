import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FlexBox, TextCommon } from '@my-monorepo/ui';


interface HeaderDrawerProps {
    drawerTitle?: React.ReactNode;
    drawerTitleAction?: React.ReactNode;
    drawerSubtitle?: React.ReactNode;
    onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
    readonly isFastSale?: boolean;
    disableCanceled?: boolean;
}

export const HeaderDrawer = (props: HeaderDrawerProps) => {
    return (
        <FlexBox direction='row' justifyContent='space-between' alignItems='self-start'>
            <FlexBox direction='column' alignItems='flex-start' justifyContent='center'>
                <TextCommon>
                    {props?.drawerTitle ?? ''}
                </TextCommon>
                {props.drawerSubtitle &&
                    <TextCommon color='#344054' fontSize={12} fontWeight={400}>
                        {props.drawerSubtitle}
                    </TextCommon>}
            </FlexBox>
            {
                <Button shape='circle' icon={ <CloseOutlined/>} onClick={props.onClose}/>
            }
        </FlexBox>
    );
};

