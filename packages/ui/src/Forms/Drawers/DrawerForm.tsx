import React from 'react';
import { Drawer } from 'antd';
import { DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import { FormikForm, FormikFormProps } from '../Formik';

export interface DrawerFormProps<T> {
    width : number;
    onClose : () => void;
    open : boolean;
    styles? : DrawerStyles;
    title? : React.ReactNode;
    footer? : React.ReactNode;
    closeIcon? : React.ReactNode;
    formikFormProps : FormikFormProps<T>;
}

export const DrawerForm = <T extends object>({ 
                        width,
                        onClose,
                        open,
                        styles,
                        title,
                        footer,
                        closeIcon,
                        formikFormProps} : DrawerFormProps<T>) => {
    return (
        <Drawer 
            width={width} 
            onClose={onClose} 
            open={open} 
            styles={styles} 
            closeIcon={closeIcon}
            title={title}
            footer={footer}
        >
            <FormikForm {...formikFormProps} />
        </Drawer>
    )
}
    


