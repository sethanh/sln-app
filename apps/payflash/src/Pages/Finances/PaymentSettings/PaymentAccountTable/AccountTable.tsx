import React from 'react';
import { RootTable, ITableProps } from '@my-monorepo/ui';
import { IPaymentAccountTableProps } from '../IPaymentAccountTableProps';
export const AccountTable = ({rawColumns, rawDatasource, title} : ITableProps<IPaymentAccountTableProps>) => {
    return (
        <RootTable 
            rawColumns={rawColumns}
            rawDatasource={rawDatasource}
            title={title}
        />
    )
}
