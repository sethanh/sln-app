import React from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  buttonClassName?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, buttonClassName }) => {
  return (
    <button className={`sent_custom-button ${buttonClassName}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
