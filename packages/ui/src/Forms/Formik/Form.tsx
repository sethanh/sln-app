import React, { ReactNode } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';

interface FormProps<T> {
    className?: string
    initialValues: T
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void
    children: (formData: T, submitForm: () => void) => ReactNode
}

export const FormikForm = <T extends {}>({
    initialValues,
    onSubmit,
    children,
    className
}: FormProps<T>) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({ values, submitForm }) => (
                <Form className={`${className}`}>
                    {children(values, submitForm)}
                </Form>
            )}
        </Formik>
    );
};
