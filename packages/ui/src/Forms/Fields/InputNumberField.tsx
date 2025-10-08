import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Form, InputNumber } from 'antd';
import { FlexBox, TextCommon } from '../../Components';

interface InputNumberFieldProps {
  fieldName: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: number | null) => void;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  formatter?: ((value: number | undefined, info: {
    userTyping: boolean;
    input: string;
  }) => string) | undefined
}

export const InputNumberField: React.FC<InputNumberFieldProps> = ({
  fieldName,
  label,
  placeholder,
  disabled,
  onChange,
  required,
  min,
  max,
  step,
  precision,
  formatter
}) => {
  const [field, meta] = useField<number | null>(fieldName);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();
  const error = meta.touched && meta.error;

  const handleChange = (value: number | null) => {
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
        validateStatus={error ? 'error' : ''}
        help={error ? meta.error : undefined}
        style={{ width: '100%', marginBottom: 0 }}
      >
        <InputNumber
          id={fieldName}
          name={fieldName}
          style={{ width: '100%' }}
          placeholder={placeholder}
          disabled={disabled}
          value={field.value ?? undefined}
          onChange={handleChange}
          onBlur={handleBlur}
          min={min}
          max={max}
          step={step}
          precision={precision}
          formatter={formatter}
        />
      </Form.Item>
    </FlexBox>
  );
};
