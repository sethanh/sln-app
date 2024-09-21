import React, { PropsWithChildren, FC, useState } from 'react';
import { IAccountActionProps } from './IAccountAction';
import '../Sidebars/Sidebar.css'

function getInitials(name: string) {
    const words = name.split(" ");
    const lastLetter = words[words.length - 1][0]; // Chữ cái đầu của từ cuối cùng
    return `${lastLetter}`; // Nối chữ cái đầu và cuối
}

function getLastName(name: string) {
  const words = name.split(" ");// Chữ cái đầu của từ đầu tiên
  const lastLetter = words[words.length - 1]; // Chữ cái đầu của từ cuối cùng
  return `${lastLetter}`; // Nối chữ cái đầu và cuối
}

export const AccountProfile: FC<PropsWithChildren<IAccountActionProps>> = ({
  label,
  className,
  border
}) => {
  const termName = getInitials(label);
  const LasName = getLastName(label);
  return (
    <div className={`sent_group-sidebar-wrapper ${className}`} >
      <div className={`sent_group-sidebar-label ${border ? 'shadow-border' : ''}`}>
        <div className="sent_group-sidebar-label-pre">
          <div className="sent_account-profile-avatar">{termName.toUpperCase()}</div>
          <div className="sent_group-sidebar-label-pre-label">{LasName} Organization</div>
        </div>
      </div>
    </div>
  );
};

