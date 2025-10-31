import { ModalProps } from 'antd/lib/modal';

import { ModalCustom } from '../ModalCustom';
import { HeaderModalConfirm } from './HeaderModalConfirm';

export const ModalConfirm = (props:  ModalProps) => {
    return (
        <ModalCustom
            open={props?.open}
            title={<HeaderModalConfirm />}
            onCancel={props.onCancel}
            footer={props.footer}
            onOk={props.onOk}
            okButtonProps={{
                className: 'btn-confirm',
            }}
            okText='Confirm'
            showDivider={false}
        >
            <div className='line-container'>
                <div className='line one' />
                <div className='line two' />
                <div className='line three' />
                <div className='line four' />
            </div>
            <div className='content'>
                {props?.children}
            </div>
        </ModalCustom>
    );
};
