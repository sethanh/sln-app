import React from 'react';
import { RootTable, ITableProps } from '@my-monorepo/ui';
import { IAccountProps } from '../IAccountProps';
export const AccountTable = ({rawColumns, rawDatasource} : ITableProps<IAccountProps>) => {
    return (
        <RootTable 
            rawColumns={rawColumns}
            rawDatasource={rawDatasource}
        />
    )
}
