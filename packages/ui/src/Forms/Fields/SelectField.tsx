// SelectField.tsx
import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Select } from 'antd';
import { TextCommon } from '../../Components';

interface SelectFieldProps {
  fieldName: string;
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  onChange?: (value: string) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  fieldName,
  label,
  options,
  placeholder,
  onChange,
}) => {
  const [field, meta] = useField(fieldName);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();
  const error = meta.touched && meta.error;

  const handleChange = (value: string) => {
    setFieldValue(fieldName, value);
    if (onChange) onChange(value);
  };

  return (
    <div>
      {label && <label>{label}</label>}
      <Select
        value={field.value}
        onChange={handleChange}
        onBlur={() => setFieldTouched(fieldName, true)}
        placeholder={placeholder}
        options={options}
      />
      {error && <TextCommon color='red' fontSize={12}>{error}</TextCommon>}
    </div>
  );
};
