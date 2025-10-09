import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Radio, Form, RadioGroupProps } from 'antd';
import { FlexBox, TextCommon } from '../../Components';

interface RadioGroupFieldProps extends RadioGroupProps {
  fieldName: string;
  label?: string;
  required?: boolean;
  options: { label: string; value: string }[];
}

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  fieldName,
  label,
  required,
  options,
  ...rest
}) => {
  const [field, meta] = useField(fieldName);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();
  const showError = meta.touched && !!meta.error;

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
        <Radio.Group
          value={field.value}
          onChange={(e) => setFieldValue(fieldName, e.target.value)}
          onBlur={() => setFieldTouched(fieldName, true)}
          options={options}
          {...rest}
        />
      </Form.Item>
    </FlexBox>
  );
};
