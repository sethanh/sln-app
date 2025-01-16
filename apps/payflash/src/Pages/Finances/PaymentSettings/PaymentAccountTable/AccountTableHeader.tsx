import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react'
import './AccountTable.css'

export const AccountTableHeader = () => {
    return (
        <div className='account-table-header'>
            <div className='account-table-header-left'>
                <h3>Client List</h3>
            </div>

            <div className='account-table-header-right'>
                <Input placeholder="SearchID, Client, Phone, Email" prefix={<SearchOutlined />} />
                <Button 
                    type='default' 
                    icon={<FilterOutlined />} 
                    className='filter-button'>
                        Filter
                </Button>
            </div>
        </div>
    )
}