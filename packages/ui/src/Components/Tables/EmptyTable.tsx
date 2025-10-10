import React, { useMemo } from 'react';
import { Empty } from 'antd';
import { Block, FlexBox } from '../Container';
import { TextCommon } from '../Typography';
export interface EmptyTableProps {
    readonly isSearch?: boolean;
    readonly title?: string;
    readonly description?: string;
    readonly actionButton?: React.JSX.Element;
}

export function EmptyTable(props: EmptyTableProps) {
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
            padding={12}
        >
            <Empty
                description={
                    <FlexBox width={350} gap={8} direction='column' padding='0px 24px 0px 24px'>
                        <FlexBox gap={2} direction='column' alignItems='center' justifyContent='center'>
                            <TextCommon fontSize={16} fontWeight={600}>
                                {emptyContent.title}
                            </TextCommon>
                            <TextCommon fontSize={14} color='gray' textAlign='center'>
                                {emptyContent.description}
                            </TextCommon>
                        </FlexBox>
                        {emptyContent.actionButton &&
                            <FlexBox justifyContent='center' alignItems='center'>
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
