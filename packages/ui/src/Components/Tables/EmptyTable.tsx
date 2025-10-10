import React, { useMemo } from 'react';
import { Empty, Image } from 'antd';
import { Block, FlexBox } from '../Container';
import { TextCommon } from '../Typography';
export interface EmptyTableProps {
    readonly isSearch?: boolean;
    readonly title?: string;
    readonly description?: string;
    readonly actionButton?: React.JSX.Element;
}

export default function EmptyTable(props: EmptyTableProps) {
    const {
        isSearch,
        title = "",
        description = "",
        actionButton = null
    } = props;

    const emptyContent = useMemo(() => {

        return {
            imageEmptyUrl: '/assets/images/empty-data.png',
            title: title,
            description: description,
            actionButton: actionButton
        };
    }, [actionButton, description, isSearch, title]);

    return (
        <FlexBox
            height='100%'
            justifyContent='center'
            alignItems='center'
            direction='column'
        >
            <Empty
            description={
                <FlexBox width={350} gap={16} direction='column'>
                    <TextCommon fontSize={16} fontWeight={600}>
                        {emptyContent.title}
                    </TextCommon>
                    <TextCommon fontSize={14} color='gray'>
                        {emptyContent.description}
                    </TextCommon>
                    {emptyContent.actionButton && 
                <FlexBox justifyContent='center'>
                    <Block width='fit-content' >
                        {emptyContent.actionButton}
                    </Block>
                </FlexBox>
                    }
                </FlexBox>
            }
            />
        </FlexBox>
    );
}
