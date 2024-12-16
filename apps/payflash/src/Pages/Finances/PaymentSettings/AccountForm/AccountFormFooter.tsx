import { Button } from "antd";
import React from "react";

export const AccountFormFooter = () => {
    return (
        <div className="account-footer">
            <Button type='default'>Cancel</Button>
            <Button type='primary'>Submit</Button>
        </div>
    )
};