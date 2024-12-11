import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';

export interface ITableProps<T> {
    rawColumns : ColumnsType<T>;
    rawDatasource : T[]
}

export const CustomizeTable = <T,>({ rawColumns, rawDatasource } : ITableProps<T>) => {
    const columns = rawColumns?.map((column) => ({
        ...column
    }));

    const datasource = rawDatasource?.map((data) => ({
        ...data
    }));
    
    return (
        <Table columns={columns} dataSource={datasource} />
    )
}

