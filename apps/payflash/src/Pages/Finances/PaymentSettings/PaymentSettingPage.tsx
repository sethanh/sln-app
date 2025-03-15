import React, { useRef } from 'react';
import { useAtom } from 'jotai';
import { FormikHelpers, FormikProps } from 'formik';
import { AccountTable, AccountTableHeader } from './PaymentAccountTable';
import { actionItems, rawColumns, rawDatasource } from '@my-monorepo/payflash/Constants';
import { AccountForm, AccountFormBody, AccountFormFooter, AccountFormHeader } from './PaymentAccountForm';
import { PaymentSettingsDrawerAtom } from '@my-monorepo/payflash/Root/Store/Drawer';
import './PaymentSettingPage.css';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import { PaymentAccountFormAtom } from '@my-monorepo/payflash/Root/Store/Form';
import { PaymentAccountProps } from './IPaymentAccountProps';

const PaymentSettingPage: React.FC = () => {
    const [paymentFormValues, setPaymentFormValues] = useAtom(PaymentAccountFormAtom);
    const [open, setOpen] = useAtom(PaymentSettingsDrawerAtom);
    const formikRef = useRef<FormikProps<PaymentAccountProps>>(null);

    const showDrawer = async () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const onSubmit = (values : PaymentAccountProps, { setSubmitting, resetForm }: FormikHelpers<PaymentAccountProps>) => {
        setTimeout(() => {
            setSubmitting(false);
            resetForm();
        }, 100);
    }
    const handleSubmit = () => {
        if(formikRef.current) {
            console.log("Success");
            formikRef.current.submitForm();
        }
    }

    const menuProps = {
        items: actionItems
    };

    return (
        <div>
            <header className={"header"}>
                <div className={"header-left"}>
                    <h3>Payment Settings</h3>
                </div>

                <div className={"header-right"}>
                    <Dropdown menu={menuProps}>
                        <Button>
                            <Space>
                                Action
                                <DownOutlined />
                            </Space>
                        </Button>
                    </Dropdown>
                    <Button 
                        type='primary' 
                        icon={<SearchOutlined />} 
                        onClick={showDrawer}
                    >
                        Create Account
                    </Button>
                </div>
            </header>
            <AccountTable 
                rawColumns={rawColumns} 
                rawDatasource={rawDatasource} 
                title={<AccountTableHeader/>}/>

            <AccountForm
                width={450}
                open={open}
                onClose={onClose}
                styles={{header: {padding: '10px 0 10px 10px'}, body: {padding: '10px 10px 0 10px'}}}
                title={<AccountFormHeader/>}
                footer={<AccountFormFooter onClick={handleSubmit}/>}
                closeIcon={false}
                formikFormProps={{ 
                    initialValues: paymentFormValues,
                    children : <AccountFormBody/>,
                    innerRef: formikRef,
                    onSubmit: onSubmit
                }}
            />
        </div>
    );
};

export { PaymentSettingPage };
