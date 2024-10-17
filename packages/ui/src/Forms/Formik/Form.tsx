import React from 'react';
import { Formik, Form, Field, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

// Generic props cho form
interface FormikFormProps<T> {
  initialValues: T;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
  validate?: (values: T) => Partial<Record<keyof T, string>> | undefined;
  children: (formikProps: FormikProps<T>) => React.ReactNode;
  validationSchema?: Yup.ObjectSchema<any>;
}

export function FormikForm<T extends object>({
  initialValues,
  onSubmit,
  validate,
  children,
}: FormikFormProps<T>) {
  return (
    <Formik<T>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      {(formikProps) => (
        <Form onSubmit={formikProps.handleSubmit}>
          {children(formikProps)}
        </Form>
      )}
    </Formik>
  );
}
