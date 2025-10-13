import { ModalProps } from 'antd/lib/modal';
import { ModalCustom } from '../ModalCustom';
import { HeaderModalDelete } from './HeaderModalDelete';


export const ModalDelete = (props: ModalProps) => {
    return (
        <ModalCustom
            open={props?.open}
            title={<HeaderModalDelete />}
            onCancel={props.onCancel}
            onOk={props.onOk}
            okButtonProps={{
                className: 'btn-delete',
            }}
            okText="Delete"
            cancelText="Cancel"
            showDivider={false}
            footer={props.footer}
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
