import React from 'react';
import { Formik, Form, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
interface FormikFormProps<T> {
  initialValues: T;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
  validate?: (values: T) => Partial<Record<keyof T, string>> | undefined;
  children: (formikProps: FormikProps<T>) => React.ReactNode;
  validationSchema?: Yup.ObjectSchema<any>;
}

function FormikFormInner<T extends object>({
  initialValues,
  onSubmit,
  validate,
  children,
  validationSchema,
}: FormikFormProps<T>) {
  return (
    <Formik<T>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      validationSchema={validationSchema}
    >
      {(formikProps) => <Form>{children(formikProps)}</Form>}
    </Formik>
  );
}

export const FormikForm = <T extends object>(props: FormikFormProps<T>) => (
  <FormikFormInner {...props} />
);
