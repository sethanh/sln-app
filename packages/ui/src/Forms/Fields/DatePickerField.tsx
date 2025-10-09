import React from 'react';
import { useField, useFormikContext } from 'formik';
import { DatePicker, Form, DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { FlexBox, TextCommon } from '../../Components';

interface DatePickerFieldProps extends DatePickerProps {
  fieldName: string;
  label?: string;
  required?: boolean;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  fieldName,
  label,
  required,
  ...rest
}) => {
  const [field, meta] = useField(fieldName);
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();
  const showError = meta.touched && !!meta.error;

  const handleChange: DatePickerProps['onChange'] = (date) => {
    setFieldValue(fieldName, date ? date.toISOString() : null);
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
        <DatePicker
          value={field.value ? dayjs(field.value) : null}
          onChange={handleChange}
          onBlur={() => setFieldTouched(fieldName, true)}
          {...rest}
        />
      </Form.Item>
    </FlexBox>
  );
};
