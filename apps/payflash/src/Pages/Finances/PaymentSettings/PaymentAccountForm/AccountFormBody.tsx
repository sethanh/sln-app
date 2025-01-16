import React from 'react';
import { Field, FieldProps } from 'formik';
import { Input, Select } from 'antd';
import { bankNameOptions, bankGroupOptions } from '@my-monorepo/payflash/Constants';
import './AccountForm.css'

export const AccountFormBody = () => {
    return (
        <div className='account-form'>
            <div className='account-form-body'>
                <header>
                    <h4>General Information</h4>
                </header>
                <div className='info-container'>
                    <div className='general-info-inputs'>
                        
                        <div style={{width: '90%'}}>
                            <label htmlFor="bankName" style={{display: 'block'}}>Bank name<span style={{ color: 'red' }}>*</span></label>
                            <Field name="bankName">
                                {({ field, form }: FieldProps) => (
                                    <Select 
                                        id='bankName'
                                        showSearch
                                        placeholder={<span style={{color: 'gray'}}>Select your bank</span>}
                                        {...field} 
                                        options={bankNameOptions}
                                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                        onChange={(value) => form.setFieldValue('bankName', value)}
                                        style={{width: '100%'}}
                                    />
                                )}
                            </Field>
                        </div>   
                        
                        <div style={{width: '90%'}}>
                            <label htmlFor="bankAccountNumber">Bank Account Number<span style={{ color: 'red' }}>*</span></label>
                            <Field name="bankAccountNumber">
                                {({ field }: FieldProps) => (
                                    <Input 
                                    id="bankAccountNumber"
                                    {...field} 
                                    placeholder="Enter your account number" 
                                    required 
                                    style={{width: '100%'}}
                                />
                                )}
                            </Field> 
                        </div>
                    </div>
                </div>
            </div>

            <div className='account-form-body'>
                <header>
                    <h4>Additional Information</h4>
                </header>
                <div className='info-container'>
                    <div className='general-info-inputs'>                
                        <div style={{width: '90%'}}>
                            <label htmlFor="bankGroup" style={{display: 'block'}}>Bank group</label>
                            <Field name="bankGroup">
                                {({ field, form }: FieldProps) => (
                                    <Select 
                                        id='bankGroup'
                                        showSearch
                                        placeholder={<span style={{color: 'gray'}}>Select bank group</span>}
                                        {...field} 
                                        options={bankGroupOptions}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                        onChange={(value) => form.setFieldValue('bankGroup', value)}
                                        style={{width: '100%'}}
                                    />
                                )}
                            </Field>
                        </div>  

                        <div style={{width: '90%'}}>
                            <label htmlFor="note">Note</label>
                            <Field name="note">
                                {({ field }: FieldProps) => (
                                    <Input.TextArea
                                        id='note'
                                        {...field} 
                                        placeholder="Eg. Account used for daily expenses" 
                                        style={{ width: '100%', resize: 'none' }} 
                                        rows={5}
                                    />
                                )} 
                            </Field>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}