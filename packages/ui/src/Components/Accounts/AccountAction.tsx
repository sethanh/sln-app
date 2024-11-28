import React, { PropsWithChildren} from 'react';
import { IAccountActionProps } from './IAccountAction';
import '../Sidebars/Sidebar.css'

function getInitials(name: string) {
    const words = name.split(" ");
    const firstLetter = words[0][0]; // Chữ cái đầu của từ đầu tiên
    const lastLetter = words[words.length - 1][0]; // Chữ cái đầu của từ cuối cùng
    return `${firstLetter}${lastLetter}`; // Nối chữ cái đầu và cuối
}

export const AccountAction: React.FC<PropsWithChildren<IAccountActionProps>> = ({
  label,
  className,
  border,
  style
}) => {
  const termName = getInitials(label || '');
  return (
    <div className={`sent_group-sidebar-wrapper ${className}`} style={style}>
      <div className={`sent_group-sidebar-label ${border ? 'shadow-border' : ''}`}>
        <div className="sent_group-sidebar-label-pre">
          <div className="sent_account-action-avatar">{termName.toUpperCase()}</div>
          <div className="sent_group-sidebar-label-pre-label">{label}</div>
        </div>
      </div>
    </div>
  );
};

