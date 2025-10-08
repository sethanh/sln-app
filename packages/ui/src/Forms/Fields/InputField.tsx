import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Input, Form } from 'antd';
import { FlexBox, TextCommon } from '../../Components';

interface InputFieldProps {
  fieldName: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  required?: boolean;
  type?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  fieldName,
  label,
  placeholder,
  disabled,
  onChange,
  required,
  type = 'text',
}) => {
  const [field, meta] = useField(fieldName);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();

  const showError = meta.touched && !!meta.error;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFieldValue(fieldName, value);
    if (onChange) onChange(value);
  };

  const handleBlur = () => {
    setFieldTouched(fieldName, true);
  };

  return (
    <FlexBox flex={1} direction='column'>
      <TextCommon fontWeight={500}>
        {label}
        {required && <span style={{ color: 'red', fontWeight: 700 }}> *</span>}
      </TextCommon>
      <Form.Item
        validateStatus={showError ? 'error' : undefined}
        help={showError ? meta.error : undefined}
        style={{ width: '100%', marginBottom: 0 }}
      >
      <Input
        {...field}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </Form.Item>
    </FlexBox>
  );
};
