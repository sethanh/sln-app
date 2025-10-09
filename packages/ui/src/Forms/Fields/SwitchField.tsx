import React from 'react';
import { useField, useFormikContext } from 'formik';
import { Switch, Form } from 'antd';
import { FlexBox, TextCommon } from '../../Components';

interface SwitchFieldProps {
  fieldName: string;
  label?: string;
  required?: boolean;
  onChange?: (checked: boolean) => void;
}

export const SwitchField: React.FC<SwitchFieldProps> = ({
  fieldName,
  label,
  required,
  onChange,
}) => {
  const [field, meta] = useField(fieldName);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();
  const showError = meta.touched && !!meta.error;

  const handleChange = (checked: boolean) => {
    setFieldTouched(fieldName, true)
    setFieldValue(fieldName, checked);
    if (onChange) onChange(checked);
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
        <Switch
          checked={field.value}
          onChange={handleChange}
        />
      </Form.Item>
    </FlexBox>
  );
};
