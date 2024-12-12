import React from 'react';
import { Drawer } from 'antd';
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import { FormikForm, FormikFormProps } from '../Formik';

export interface DrawerFormProps<T> {
    title? : string;
    width : number;
    onClose : () => void;
    open : boolean;
    styles? : DrawerStyles;
    extra? : React.ReactNode;
    formikFormProps : FormikFormProps<T>;
}

export const DrawerForm = <T extends object>({ title,
                        width,
                        onClose,
                        open,
                        styles,
                        extra,
                        formikFormProps} : DrawerFormProps<T>) => {
    return (
        <Drawer 
            title={title} 
            width={width} 
            onClose={onClose} 
            open={open} 
            styles={styles} 
            extra={extra}
        >
            <FormikForm {...formikFormProps} />
        </Drawer>
    )
}
    


