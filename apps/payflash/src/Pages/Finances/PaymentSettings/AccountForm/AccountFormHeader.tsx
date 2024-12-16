import { CloseCircleFilled } from "@ant-design/icons";
import React from "react";

export const AccountFormHeader = () => {
    return (
        <div className="account-header">
            <div className="account-header-title">
                <h5 style={{margin: 0}}>Create Client</h5>
                <p style={{margin: 0, fontSize: 12}}>Created on {new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
            </div>

            <CloseCircleFilled style={{position: "absolute", right: 10, fontSize: 20, cursor: "pointer", color: "#e6e4e4"}}/>
        </div>
    )
}