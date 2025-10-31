import { Button, ButtonProps, Tooltip } from 'antd';
import React from 'react';

import { ButtonType } from 'antd/lib/button';
import { Block } from '../Container';
import { TextCommon } from '../Typography';
import './Button.css'

export interface AppButtonProps extends Omit<ButtonProps, 'type'> {
    readonly translateCode?: string;
    readonly width?: React.CSSProperties['width'];
    readonly height?: React.CSSProperties['height'];
    readonly padding?: React.CSSProperties['padding'];
    readonly textAlign?: React.CSSProperties['textAlign'];
    readonly borderColor?: React.CSSProperties['borderColor'];
    readonly type?: ButtonType | 'secondary_blue';
    readonly flex?: React.CSSProperties['flex'];
    readonly display?: React.CSSProperties['display'];
    readonly tooltipTitle?: string;
    readonly toolTipPlacement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
}

export const ButtonCommon = (props: AppButtonProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, translateCode, width, height, padding, textAlign, borderColor, type, className, classNames, tooltipTitle, toolTipPlacement, display, flex, ...rest } = props;

    const style = React.useMemo((): React.CSSProperties => {
        return {
            width,
            padding,
            textAlign,
            borderColor,
            height,
            display,
            flex
        };
    }, [borderColor, padding, textAlign, width, height, display, flex]);

    const renderButton = () => (
        <Button
            classNames={{
                icon: 'app-button-icon',
                ...classNames
            }}
            className={`app-button ${props.className}`}
            style={{ ...style, opacity: props.disabled ? 0.4 : 1 }}
            {...rest}
            type={type as ButtonType}
        >
            {translateCode ? (
                <Block display='inline-block'><TextCommon fontSize={14}>{translateCode}</TextCommon></Block>
            ) : (
                children
            )}
        </Button>
    )

    if(!props.tooltipTitle) return renderButton();

    return (
        <Tooltip placement={toolTipPlacement || 'top'} title={tooltipTitle}>
            {renderButton()}
        </Tooltip>
    );
};
