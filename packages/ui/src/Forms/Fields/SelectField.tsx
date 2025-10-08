import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Select, Form, SelectProps } from 'antd';
import { FlexBox, TextCommon } from '../../Components';

interface SelectFieldProps extends SelectProps {
  fieldName: string;
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  onChange?: (value: string) => void;
  required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  fieldName,
  label,
  options,
  placeholder,
  onChange,
  required,
  ...rest
}) => {
  const [field, meta] = useField(fieldName);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();

  const showError = meta.touched && !!meta.error;

  const handleChange = (value: string) => {
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
        <Select
          value={field.value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          options={options}
          {...rest}
        />
      </Form.Item>
    </FlexBox>
  );
};
