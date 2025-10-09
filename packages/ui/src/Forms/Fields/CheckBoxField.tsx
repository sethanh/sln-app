import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Checkbox, Form } from 'antd';
import { FlexBox, TextCommon } from '../../Components';

interface CheckBoxFieldProps {
  fieldName: string;
  label?: string;
  required?: boolean;
  children?: React.ReactNode;
  onChange?: (checked: boolean) => void;
}

export const CheckBoxField: React.FC<CheckBoxFieldProps> = ({
  fieldName,
  label,
  required,
  children,
  onChange,
}) => {
  const [field, meta] = useField({ name: fieldName, type: 'checkbox' });
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();
  const showError = meta.touched && !!meta.error;

  const handleChange = (e: any) => {
    const checked = e.target.checked;
    setFieldTouched(fieldName, true)
    setFieldValue(fieldName, checked);
    if (onChange) onChange(checked);
  };

  return (
    <FlexBox direction="column">
      {label && (
        <TextCommon fontWeight={500}>
          {label}
          {required && <span style={{ color: 'red', fontWeight: 700 }}> *</span>}
        </TextCommon>
      )}
      <Form.Item
        validateStatus={showError ? 'error' : undefined}
        help={showError ? meta.error : undefined}
        style={{ marginBottom: 0 }}
      >
        <Checkbox
          checked={field.value}
          onChange={handleChange}
        >
          {children}
        </Checkbox>
      </Form.Item>
    </FlexBox>
  );
};
