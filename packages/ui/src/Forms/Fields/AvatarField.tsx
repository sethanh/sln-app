import React, { useState, useCallback } from 'react';
import { Avatar, Button, Form } from 'antd';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
// import { AppButton, Block, FlexBox } from '@esg/ui';
import { useFormikContext } from 'formik';
// import { t } from 'i18next';
// import { FileUpload } from '@esg/business-upload';
// import { UploadImage } from '../upload';
import './AvatarUpload.css';
import { Block, FlexBox } from '../../Components';
import { FileUpload } from '../../Models';
import { UploadImage } from '../../Components/Uploads/UploadImage';

interface AvatarUploadProps {
  readonly translateCode?: string;
  readonly fieldName: string;
  readonly disabled?: boolean;
  readonly shape?: 'circle' | 'square';
  readonly icon?: React.ReactNode;
  readonly size?: number;
  readonly iconHover?: React.ReactNode;
  readonly token?: string;
  readonly createPhotoUrl?: string;
  readonly photoServer?: string;
  readonly src?: string;
}

export const AvatarField = (props: AvatarUploadProps) => {
  const { fieldName: name, size = 100, iconHover, src, photoServer: getPhotoUrl } = props;
  const [loading, setLoading] = useState(false);
    const [currentSrc, setCurrentSrc] = useState<string | undefined>(src ? `${getPhotoUrl}/${src}` : undefined);

  // ✅ Lấy formik context
  const { errors, setFieldValue, touched } = useFormikContext<Record<string, any>>();

  const handleChange = useCallback(
    (v: FileUpload) => {
      setFieldValue(name, v.id ?? '');
      if(!v?.relativePath)  return setCurrentSrc(undefined);
      setCurrentSrc(`${getPhotoUrl}/${v.relativePath}`);
    },
    [setFieldValue, name]
  );

  const error = touched?.[name] && (errors?.[name] as string | undefined);

  console.log(props);

  return (
    <Form.Item
      validateStatus={error ? 'error' : undefined}
      help={error || undefined}
    >
      <FlexBox direction="column" alignItems="center" gap={8}>
        <UploadImage
            name="file" 
            onChange={handleChange}
            setLoading={setLoading}
            disabled={props.disabled}
            className="avatar-uploader"
            token={props.token}
            createPhotoUrl={props.createPhotoUrl}
        >
          <FlexBox className="avatar-wrapper">
            <Avatar
              className="avatar-custom"
              shape={props.shape}
              size={size}
              style={{ backgroundColor: '#EAECF0', color: '#0B5DCC' }}
              src={currentSrc}
              icon={!loading ? props.icon : undefined}
            >
              {loading && <LoadingOutlined />}
            </Avatar>
            <Block
              width={size}
              height={size}
              className={`camera ${props.disabled ? 'hidden' : ''}`}
            >
              <Block
                width={size}
                height={size}
                className={
                  props.shape === 'circle'
                    ? 'camera-background-circle'
                    : 'camera-background'
                }
              />
              <Button icon={iconHover} className="icon-camera" shape="circle" />
            </Block>
          </FlexBox>
        </UploadImage>
      </FlexBox>
    </Form.Item>
  );
};

AvatarField.defaultProps = {
  shape: 'circle',
  icon: <UserOutlined />,
};
