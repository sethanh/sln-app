import { AccountDrawerAtom } from "@my-monorepo/payflash/Root/Store/Table";
import { Button } from "antd";
import { useAtom } from "jotai";
import React from "react";

export const AccountFormFooter = () => {
    const [open, setOpen] = useAtom(AccountDrawerAtom);
    const onClose = () => {
        setOpen(false);
    };
    
    return (
        <div className="account-footer">
            <Button type='default' onClick={onClose}>Cancel</Button>
            <Button type='primary' onClick={onClose}>Submit</Button>
        </div>
    )
};