import React from 'react';
import { Field, Form, FieldProps } from 'formik';
import { Input, Select, DatePicker, Avatar, Badge, SelectProps, Radio, Checkbox } from 'antd';
import { CameraOutlined, UserOutlined } from '@ant-design/icons';
import { genderOptions, clientGroupOptions, clientSourceOptions, employeeOptions, referredByOptions } from '@my-monorepo/payflash/Constants';
import './AccountForm.css'

export const AccountFormBody = () => {
    const genderLabelRender : SelectProps['labelRender'] = (props) => {
        const { label, value } = props;
        if(label) {
            return value;
        }
        return <span style={{color: 'gray'}}>Select gender</span>
    }

    const clientGroupLabelRender : SelectProps['labelRender'] = (props) => {
        const { label, value } = props;
        if(label) {
            return value;
        }
        return <span style={{color: 'gray'}}>Select client group</span>
    }

    const clientSourceLabelRender : SelectProps['labelRender'] = (props) => {
        const { label, value } = props;
        if(label) {
            return value;
        }
        return <span style={{color: 'gray'}}>Select client source</span>
    }

    const findEmployeeLabelRender : SelectProps['labelRender'] = (props) => {
        const { label, value } = props;
        if(label) {
            return value;
        }
        return <span style={{color: 'gray'}}>Find an employee</span>
    }
    return (
        <Form className='account-form'>
            <div className='account-form-body'>
                <header>
                    <h4>General Information</h4>
                </header>
                <div className='info-container'>
                    <Badge 
                        count={<CameraOutlined />} 
                        offset={[-5, 54]} 
                        style={{ backgroundColor: '#e6e4e4', 
                                borderRadius: '50%', 
                                width: '25px', 
                                height: '25px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center' }}
                    >
                        <Avatar 
                            size={60} 
                            style={{ backgroundColor: '#ced5d9' }}
                            icon={<UserOutlined style={{ fontSize: 35, color : '#0056b3' }} />} />
                    </Badge>

                    <div className='general-info-inputs'>
                        <div style={{width: '48%'}}>
                            <label htmlFor="firstName">First Name <span style={{ color: 'red'}}>*</span></label>
                            <Field name="firstName">
                                {({ field }: FieldProps) => (
                                    <Input 
                                        {...field} 
                                        placeholder="Enter first name" 
                                        required 
                                        style={{width: '100%'}}
                                    />
                                )}
                            </Field>
                        </div>
                        
                        <div style={{width: '48%'}}>
                            <label htmlFor="lastName">Last Name <span style={{ color: 'red' }}>*</span></label>
                            <Field name="lastName">
                                {({ field }: FieldProps) => (
                                    <Input 
                                        {...field} 
                                        placeholder="Enter last name" 
                                        required 
                                        style={{width: '100%'}}
                                    />
                                )}
                            </Field>
                        </div>
                        
                        <div style={{width: '48%'}}>
                            <label htmlFor="gender" style={{display: 'block'}}>Gender</label>
                            <Field name="gender">
                                {({ field }: FieldProps) => (
                                    <Select 
                                        {...field} 
                                        labelRender={genderLabelRender}
                                        defaultValue="1"
                                        options={genderOptions}
                                        style={{width: '100%'}}
                                    />
                                )}
                            </Field>
                        </div>   
                        
                        <div style={{width: '48%'}}>
                            <label htmlFor="dateOfBirth">Date of birth</label>
                            <Field name="dateOfBirth">
                                {({ field }: FieldProps) => (
                                    <DatePicker {...field} style={{width: '100%'}} /> 
                                )}
                            </Field>  
                        </div>
                        
                        <div style={{width: '48%'}}>
                            <label htmlFor="contact">Contact Information <span style={{ color: 'red' }}>*</span></label>
                            <Field name="contact">
                                {({ field }: FieldProps) => (
                                    <Input 
                                    {...field} 
                                    placeholder="Enter your phone number" 
                                    required 
                                    style={{width: '100%'}}
                                />
                                )}
                            </Field> 
                        </div>
                        <div style={{width: '48%'}}>  
                            <Field name="email">
                                {({ field }: FieldProps) => (
                                    <Input 
                                    {...field} 
                                    placeholder="Enter your email" 
                                    required 
                                    style={{width: '100%', marginTop: '20px'}}
                                />
                                )}
                            </Field> 
                        </div>

                        <div style={{width: '100%'}}>
                            <label htmlFor="address">Address</label>
                            <Field name="address">
                                {({ field }: FieldProps) => (
                                    <Input 
                                    {...field} 
                                    placeholder="Enter address" 
                                    style={{ width: '100%' }} 
                                    required 
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
                        <div style={{width: '48%'}}>
                            <label htmlFor="clientGroup">Client Group</label>
                            <Field name="clientGroup">
                                {({ field }: FieldProps) => (
                                    <Select 
                                        {...field} 
                                        labelRender={clientGroupLabelRender}
                                        defaultValue="1"
                                        options={clientGroupOptions}
                                        style={{ width: '100%' }} 
                                    />
                                )}
                            </Field>   
                        </div> 
                        
                        <div style={{width: '48%'}}>
                            <label htmlFor="clientSource">Client Source</label>
                            <Field name="clientSource">
                                {({ field }: FieldProps) => (
                                    <Select 
                                        {...field} 
                                        labelRender={clientSourceLabelRender}
                                        defaultValue="1"
                                        options={clientSourceOptions}
                                        style={{ width: '100%' }} 
                                    />
                                )}
                            </Field>   
                        </div>

                        <div style={{width: '43%'}}>
                            <label htmlFor="referredBy">Referred by</label>
                            <Field name="referredBy">
                                {({ field }: FieldProps) => (
                                    <Radio.Group 
                                    {...field}
                                    options={referredByOptions}
                                    defaultValue="Employee"
                                    optionType='button'
                                    buttonStyle='solid'
                                     />
                                )}
                            </Field>   
                        </div>

                        <div style={{width: '54%'}}>
                            <Field name="findEmployee">
                                {({ field }: FieldProps) => (
                                    <Select 
                                        {...field} 
                                        labelRender={findEmployeeLabelRender}
                                        defaultValue="1"
                                        options={employeeOptions}
                                        style={{ width: '100%', marginTop: '20px'}} 
                                    />
                                )}
                            </Field>   
                        </div>

                        <div style={{width: '100%'}}>
                            <label htmlFor="note">Note</label>
                            <Field name="note">
                                {({ field }: FieldProps) => (
                                    <Input 
                                        {...field} 
                                        placeholder="Eg. Allergy to shampoo with sodium" 
                                        style={{ width: '100%' }} 
                                    />
                                )} 
                            </Field>
                        </div>
                    </div>
                </div>
                <Checkbox style={{fontWeight: 450, marginTop: '10px', marginBottom: '70px'}}>Show more details</Checkbox>
            </div>
        </Form>
    );
}