import React from 'react';
import { ButtonCommon, FlexBox, useGlobalFormRef } from '@my-monorepo/ui';
import { FormikProps } from 'formik';

interface FooterDrawerProps {
    onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void
    submitText?: string
}

export const FooterDrawer = (props: FooterDrawerProps) => {
    const { globalFormRef }= useGlobalFormRef();

    const handleSubmit = () => {
        globalFormRef?.formikRef?.current?.submitForm()
    };

    const disabled = globalFormRef?.isSubmitting || !globalFormRef?.isDirty;

    return (
        <FlexBox direction='row' alignItems='self-end' padding='4px 0' gap={12}>
            <ButtonCommon flex={1} display='flex' onClick={props?.onClose}>Cancel</ButtonCommon>
            <ButtonCommon 
                type='primary' 
                flex={1} 
                display='flex' 
                onClick={handleSubmit}
                disabled={disabled}
                loading={globalFormRef?.isSubmitting}
            >
                {props?.submitText || 'Submit'}
            </ButtonCommon>
        </FlexBox>
    );
};

