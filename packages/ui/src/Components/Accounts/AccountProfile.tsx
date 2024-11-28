import React, { PropsWithChildren } from 'react';
import '../Sidebars/Sidebar.css'
import { IAccountProfile } from './IAccountProfile';
import { UserOutlined } from '@ant-design/icons'

export const AccountProfile: React.FC<PropsWithChildren<IAccountProfile>> = ({
  label,
  className,
  border,
  style,
  avatar,
  onLogin
}) => {
  if (!label) {
    return (
      <div
        className={`sent_group-sidebar-wrapper ${className}`}
        style={style}
        onClick={() => onLogin()}
      >
        <div className={`sent_group-sidebar-label ${border ? 'shadow-border' : ''}`}>
          <div className="sent_group-sidebar-label-pre">
            <UserOutlined style={{ color: '#2292FF' }} />
            <div className="sent_group-sidebar-label-pre-label" style={{ color: '#2292FF' }}>{`   Login Flash`}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`sent_group-sidebar-wrapper ${className}`} style={style}>
      <div className={`sent_group-sidebar-label ${border ? 'shadow-border' : ''}`}>
        <div className="sent_group-sidebar-label-pre">
          <div className="sent_account-profile-avatar">
            <img src={avatar} style={{ width: "100%", height: "auto" }} alt='avatar' />
          </div>
          <div className="sent_group-sidebar-label-pre-label">{label}</div>
        </div>
      </div>
    </div>
  );
};

