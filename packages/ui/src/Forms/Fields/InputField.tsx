// InputField.tsx
import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Input } from 'antd';
import { TextCommon } from '../../Components';

interface InputFieldProps {
  fieldName: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void; // custom callback
}

export const InputField: React.FC<InputFieldProps> = ({
  fieldName,
  label,
  placeholder,
  disabled,
  onChange,
}) => {
  const [field, meta] = useField(fieldName);
  const { setFieldValue } = useFormikContext<any>();
  const error = meta.touched && meta.error;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFieldValue(fieldName, value);
    if (onChange) onChange(value);
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <Input
        {...field}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
      />
      {error && <TextCommon color='red' fontSize={12}>{error}</TextCommon>}
    </div>
  );
};
