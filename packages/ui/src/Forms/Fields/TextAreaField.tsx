import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Input, Form } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import { FlexBox, TextCommon } from '../../Components';

interface TextAreaFieldProps extends Omit<TextAreaProps, 'onChange'> {
  fieldName: string;
  label?: string;
  required?: boolean;
  rows?: number;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  fieldName,
  label,
  required,
  rows = 4,
  ...rest
}) => {
  const [field, meta] = useField(fieldName);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();
  const showError = meta.touched && !!meta.error;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFieldValue(fieldName, e.target.value);
  };

  return (
    <FlexBox direction="column">
      <TextCommon fontWeight={500}>
        {label}
        {required && <span style={{ color: 'red', fontWeight: 700 }}> *</span>}
      </TextCommon>
      <Form.Item
        validateStatus={showError ? 'error' : undefined}
        help={showError ? meta.error : undefined}
        style={{ marginBottom: 0 }}
      >
        <Input.TextArea
          name={field.name}
          value={field.value}
          rows={rows}
          onChange={handleChange}
          onBlur={() => setFieldTouched(fieldName, true)}
          {...rest}
        />
      </Form.Item>
    </FlexBox>
  );
};
