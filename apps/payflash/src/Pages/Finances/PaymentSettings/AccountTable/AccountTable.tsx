import React from 'react';
import { RootTable, ITableProps } from '@my-monorepo/ui';
import { IAccountTableProps } from '../IAccountProps';
export const AccountTable = ({rawColumns, rawDatasource, title} : ITableProps<IAccountTableProps>) => {
    return (
        <RootTable 
            rawColumns={rawColumns}
            rawDatasource={rawDatasource}
            title={title}
        />
    )
}
