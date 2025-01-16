import { PaymentSettingsDrawerAtom } from "@my-monorepo/payflash/Root/Store/Drawer";
import { Button } from "antd";
import { useAtom } from "jotai";
import React from "react";
import { PaymentAccountProps } from "../IPaymentAccountProps";
import { FormikHelpers } from "formik";

interface IAccountFormFooterProps {
    onClick: () => void;
}

export const AccountFormFooter = ({ onClick } : IAccountFormFooterProps) => {
    const [open, setOpen] = useAtom(PaymentSettingsDrawerAtom);
    const onClose = () => {
        setOpen(false);
    };
    
    return (
        <div className="account-footer">
            <Button type='default' onClick={onClose}>Cancel</Button>
            <Button type='primary' onClick={onClick}>Submit</Button>
        </div>
    )
};