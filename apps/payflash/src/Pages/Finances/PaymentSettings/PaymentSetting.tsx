import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { AccountTable, AccountTableHeader } from './AccountTable';
import { actionItems, rawColumns, rawDatasource } from '@my-monorepo/payflash/Constants';
import { AccountForm, AccountFormBody, AccountFormFooter, AccountFormHeader } from './AccountForm';
import { AccountTableAtom } from '@my-monorepo/payflash/Root/Store/Table';
import './PaymentSettingPage.css';
import { CloseCircleFilled, CloseCircleOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';

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

    const menuProps = {
        items: actionItems
    }
    
    return (
        <div>
            <header className={"header"}>
                <div className={"header-left"}>
                    <h3>Simple CRM</h3>
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
                        Create Client
                    </Button>
                </div>
            </header>
            <AccountTable 
                rawColumns={rawColumns} 
                rawDatasource={rawDatasource} 
                title={<AccountTableHeader/>}/>
            <AccountForm
                width={420}
                onClose={onClose}
                open={open}
                styles={{header: {padding: '10px 0 10px 10px'}, body: {padding: '10px 10px 0 10px'}}}
                title={<AccountFormHeader />}
                footer={<AccountFormFooter/>}
                closeIcon={
                    <CloseCircleFilled style={{ 
                        fontSize: '20px', 
                        color: '#e2dada', 
                        position: 'absolute',
                        right: '20px',
                        cursor: 'pointer' 
                    }} />
                }
                formikFormProps={{
                    initialValues: accountTableValues,
                    onSubmit: onSubmit,
                    children: <AccountFormBody/>
                }}
            />
        </div>
    );
};

export { PaymentSettingPage }
