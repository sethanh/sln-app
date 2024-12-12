import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Field } from 'formik';
import { Button } from '@my-monorepo/ui';
import { AccountTable } from './AccountTable';
import { rawColumns, rawDatasource } from '@my-monorepo/payflash/Constants';
import { AccountForm } from './AccountForm';
import { AccountTableAtom } from '@my-monorepo/payflash/Root/Store/Table';
import './PaymentSettingPage.css';

const PaymentSettingPage: React.FC = () => {
    const [accountTableValues, setAccountTableValues] = useAtom(AccountTableAtom);
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };
    const onSubmit = () => {}
    
    return (
        <div>
            <AccountTable rawColumns={rawColumns} rawDatasource={rawDatasource} />
            <Button label='Add Account' onClick={showDrawer} buttonClassName='mainButton' />
            <AccountForm
                title='Add Account'
                width={500}
                onClose={onClose}
                open={open}
                formikFormProps={{
                    initialValues: accountTableValues,
                    onSubmit: onSubmit,
                    children: (
                        <div className={"formContainer"}>
                            <label htmlFor='accountType'>Account Type</label>
                            <Field name='accountType' type='text' />

                            <label htmlFor='accountName'>Account Name</label>
                            <Field name='accountName' type='text' />

                            <label htmlFor='accountBalance'>Account Balance</label>
                            <Field name='accountBalance' type='text' />

                            <Button label='Submit' onClick={onSubmit} />
                        </div>
                    )
                }}
            />
        </div>
    );
};

export { PaymentSettingPage }
