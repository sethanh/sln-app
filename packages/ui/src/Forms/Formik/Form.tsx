import React, { useEffect, useRef } from 'react';
import { Formik, Form, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useGlobalFormRef } from './hooks';
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
  const  { setGlobalFormRef }= useGlobalFormRef();
  const formikRef = useRef<FormikProps<T>>(null);

  useEffect(() => {
    setGlobalFormRef({
      formikRef: formikRef,
      isDirty: false,
      isSubmitting: false
    });
  }, []);

  return (
    <Formik<T>
      innerRef={formikRef} 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      validationSchema={validationSchema}
    >
      {(formikProps) => {

        useEffect(() => {
          setGlobalFormRef(prev => ({
           ...prev,
           isDirty: formikProps.dirty,
           isSubmitting: formikProps.isSubmitting
          }));
        }, [formikProps.dirty, formikProps.isSubmitting]);
        
        return(<Form>{children(formikProps)}</Form>
        )}}
    </Formik>
  );
}

export const FormikForm = <T extends object>(props: FormikFormProps<T>) => (
  <FormikFormInner {...props} />
);
