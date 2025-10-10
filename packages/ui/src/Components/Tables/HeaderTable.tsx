import React from 'react';

import './TableCommon.css';
import { Block, FlexBox } from '../Container';
import { TextCommon } from '../Typography';

interface HeaderTableProps {
    titleTable?: string;
    subTitleTable?: React.ReactNode;
    onSearch?: (value: string) => void;
    playHolderInputSearch?: string;
    onFilter?: () => void;
    disableFilter?: boolean;
    onExportExcel?: () => void;
    showFilterDropdown?: () => React.ReactNode;
    leftHeaderRender?: () => React.ReactNode;
    rightActionRender?:  React.ReactNode;
}

export const HeaderTable = (props: HeaderTableProps) => {
    const {  rightActionRender, leftHeaderRender } = props;
    // const [searchParams] = usePagination();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const debouncedHandleSearch = useCallback(
    //     debounce((search: string) => {
    //         onSearch?.(search);
    //     }, 1000),
    //     []
    // );

    return (
        <FlexBox justifyContent='space-between' alignItems='center'>
            <FlexBox alignItems='center' gap={12}>
                {
                    (props.titleTable || props.subTitleTable) && <FlexBox gap={12} direction='column' flex='none'>
                        {
                            props.titleTable && <TextCommon fontSize={18} fontWeight={600}>
                                {props.titleTable}
                            </TextCommon>
                        }
                        {
                            props.subTitleTable && <TextCommon>
                                {props.subTitleTable}
                            </TextCommon>
                        }
                    </FlexBox>
                }
                {leftHeaderRender && leftHeaderRender()}
            </FlexBox>
            <Block width='50%'>
                <FlexBox justifyContent='flex-end' alignItems='center' gap={16}>
                    {/* {props.onSearch && <InputSearch
                        height={36}
                        defaultValue={searchParams.search}
                        width={288}
                        onChange={(e) => debouncedHandleSearch(e.target.value)}
                        placeholder={props.playHolderInputSearch}
                    />} */}
                    {/* {props.onExportExcel &&
                        <Button
                            borderColor='#079455'
                            onClick={props.onExportExcel}>
                            <FlexBox gap={6}>
                                <IconPrint color='#079455' />
                                <TextCommon translateCode='Export Data' />
                            </FlexBox>
                        </Button>
                    } */}
                    {/* {
                        props.onFilter
                        && <AppButton
                            onClick={props.onFilter}
                            translateCode='Filter'
                            icon={<IconFilter />}
                        />
                    } */}
                    {rightActionRender && rightActionRender}
                    {props.showFilterDropdown && props.showFilterDropdown()}
                </FlexBox>
            </Block>
        </FlexBox>
    );
};
