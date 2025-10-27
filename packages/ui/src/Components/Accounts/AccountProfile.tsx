import React, { PropsWithChildren } from 'react'
import '../Sidebars/Sidebar.css'
import { IAccountProfile } from './IAccountProfile'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd';

export const AccountProfile: React.FC<PropsWithChildren<IAccountProfile>> = ({
  label,
  className,
  border,
  style,
  avatar,
  onLogin,
  icon,
  onLogOut,
  onViewProfile
}) => {

  const items: MenuProps['items'] = [
    {
      icon: <LogoutOutlined style={{ fontSize: 17}}/>,
      key: '1',
      label: 'Log out Flash',
      onClick:()=> {onLogOut()},
      style: {
        fontSize: 14,
      }
    }
  ];

  if (!label) {
    return (
      <div
        className={`${className}`}
        style={style}
        onClick={() => onLogin()}
      >
        <div className={`sent_group-sidebar-label ${border ? 'shadow-border' : ''}`}>
          <div className="sent_group-sidebar-label-pre">
            {icon || <UserOutlined style={{ color: '#2292FF' }} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Dropdown
      menu={{ items }}
      placement="bottom"
    >
      <div className={`sent_group-sidebar-wrapper ${className}`} style={style}>
        <div 
          className={`sent_group-sidebar-label ${border ? 'shadow-border' : ''}`} 
          onClick={onViewProfile ? () => onViewProfile() : undefined}
        >
          <div className="sent_group-sidebar-label-pre">
            <div className="sent_account-profile-avatar">
              <img src={avatar} className='sent_account-profile-avatar-img' alt='avatar' />
            </div>
            <div className="sent_group-sidebar-label-pre-label">{label}</div>
          </div>
        </div>
      </div>
    </Dropdown>
  );
};

