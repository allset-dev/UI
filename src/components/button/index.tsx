import { ReactNode } from 'react';

import { CN } from 'utils';

import './index.scss';

export interface ASButtonProps {
  text?: string;
  buttonStyle?: 'primary' | 'secondary' | 'primary-solid';
  children?: ReactNode;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

export function ASButton(props: ASButtonProps) {
  const {
    buttonStyle = 'primary-solid',
    children,
    className = '',
    text = '',
    type = 'button',
    disabled,
  } = props;

  const buttonChildren = children || text;

  return (
    <button
      className={CN('as-button', `as-${buttonStyle}`, className)}
      type={type}
      disabled={disabled}
    >
      {buttonChildren}
    </button>
  );
}
