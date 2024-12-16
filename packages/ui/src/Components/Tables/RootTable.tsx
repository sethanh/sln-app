import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table/interface';

export interface ITableProps<T> {
    rawColumns : ColumnsType<T>;
    rawDatasource : T[];
    title? : React.ReactNode;
    footer? : React.ReactNode;
}

export const RootTable = <T,>({ rawColumns, rawDatasource, title, footer } : ITableProps<T>) => {
    const columns = rawColumns?.map((column) => ({
        ...column
    }));

    const datasource = rawDatasource?.map((data) => ({
        ...data
    }));
    
    return (
        <Table 
            columns={columns} 
            dataSource={datasource} 
            title={ title? () => title : undefined }
            footer={ footer? () => footer : undefined }
            bordered={ title? true : false }
            />
    )
}

