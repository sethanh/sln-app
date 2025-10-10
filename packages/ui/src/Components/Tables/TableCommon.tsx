/* eslint-disable react/prop-types */
import './TableCommon.css';
// import { PageInfo } from '@esg/framework';
import {
    Pagination,
    Table,
    TableColumnsType,
    TableProps
} from 'antd';
import React from 'react';
import { Block } from '../Container';
import { EmptyTableProps, EmptyTable } from './EmptyTable';
import { HeaderTable } from './HeaderTable';
import { PageInfo } from '../../Frameworks';
// import { useTranslation } from 'react-i18next';

// import { Block } from '../layouts';
// import { usePagination } from '../../hooks';
// import { HeaderTable } from './HeaderTable';
// import EmptyTable, { EmptyTableProps } from './EmptyTable';

interface TableCommonProps<TItem> extends TableProps<TItem> {
    readonly placeholderSearchTransCode?: string;
    readonly titleTableTransCode?: string;
	readonly subTitleTable?: React.ReactNode;
    readonly onPageChange?: (nextPage: number, pageSize?: number) => void;
    readonly pageInfo?: PageInfo;
    readonly showHeader?: boolean;
    readonly showFooter?: boolean;
    readonly onSearch?: (value: string) => void;
    readonly onFilter?: () => void;
    readonly dataSource?: TItem[];
    readonly columns?: TableColumnsType<TItem>;
    readonly disableFilter?: boolean;
    readonly onExportExcel?: () => void;
    readonly emptyOption?: EmptyTableProps;
    readonly showFilterDropdown?: () => React.ReactNode;
    readonly rightActionRender?: React.ReactNode;
    readonly leftHeaderRender?: () => React.ReactNode;
}

const defaultPageInfo: PageInfo = {
    page: 1,
    pageSize: 20,
    totalItems: 0,
    pageCount: 0,
};

interface TableCommonItem {
    readonly id?: number;
}

type TableCommonType = <TItem extends TableCommonItem>(
    props: TableCommonProps<TItem>
) => React.ReactElement<TableCommonProps<TItem>>;

export const TableCommon: TableCommonType = (props) => {

    const renderHeader = React.useCallback(() => {
        return (
            <HeaderTable
                showFilterDropdown={props.showFilterDropdown}
                playHolderInputSearch={props?.placeholderSearchTransCode}
                titleTable={props?.titleTableTransCode}
                subTitleTable={props.subTitleTable}
                onFilter={props.onFilter}
                onExportExcel={props.onExportExcel}
                rightActionRender={props.rightActionRender}
                leftHeaderRender={props.leftHeaderRender}
            />
        );
    }, [props]);

    const renderFooter = React.useCallback(() => {
        return (
            <Pagination
                className='custom-pagination'
                current={props?.pageInfo?.page}
                total={props?.pageInfo?.totalItems}
                pageSize={props.pageInfo?.pageSize}
                onChange={(nextPage, pageSize) => {
                    if (props.onPageChange) {
                        props.onPageChange(nextPage, pageSize ?? 20);
                    }
                }}
            />
        );
    }, [props]);

    return (
        <Block borderRadius='0.5rem' backgroundColor='white' overflow='hidden' border='1px solid #eaecf0'>
            <Table
                scroll={props.scroll}
                loading={props.loading}
                rowKey={(e) => e.id ?? Math.random()}
                className='custom-table'
                title={props.showHeader ? renderHeader : undefined}
                columns={props.columns}
                locale={{ emptyText: (
                    <EmptyTable
                        title={props.emptyOption?.title}
                        description={props.emptyOption?.description}
                        actionButton={props.emptyOption?.actionButton}
                    />
                )}}
                dataSource={props.dataSource}
                pagination={false}
                footer={props.showFooter ? renderFooter : undefined}
            >
                {props.children}
            </Table>
        </Block>
    );
};

(TableCommon as React.ComponentType<TableCommonProps<TableCommonItem>>).defaultProps = {
    pageInfo: defaultPageInfo,
    showHeader: true,
    showFooter: true,
    placeholderSearchTransCode: 'MISSING_PLACEHOLDER_SEARCH',
    scroll: { x: 'max-content' },
};
