import React from 'react';
import { Upload, message } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { FileUpload } from '../../Models';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const validateFile = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

interface UploadImageProps {
    readonly name: string;
    readonly disabled?: boolean;
    readonly onChange: (value: FileUpload) => void;
    readonly setLoading?: (value: boolean) => void;
    readonly loading?: boolean;
    readonly children: React.ReactNode;
    readonly multiple?: boolean;
    readonly className?: string;
    readonly token?: string;
    readonly createPhotoUrl?: string;
}

export const UploadImage = (props: UploadImageProps) => {

    const { name, onChange, setLoading, createPhotoUrl: uploadServer, token } = props;
    const action = uploadServer;

    return (
        <Upload
            disabled={props.disabled}
            action={action}
            className={props.className}
            multiple={props.multiple}
            name={name}
            headers={{ Authorization: `Bearer ${token}` }}
            showUploadList={false}
            beforeUpload={validateFile}
            onChange={(info) => {
                if (info.file.status === 'uploading') {
                    setLoading?.(true);
                    return;
                }
                if (info.file.status === 'error') {
                    setLoading?.(false);
                    message.error('UPLOAD_FILE_ERR');
                    return;
                }
                if (info.file.status === 'done') {
                    setLoading?.(false);
                    onChange(info.file.response);
                }
            }}
        >
            {props.children}
        </Upload>
    );

};

