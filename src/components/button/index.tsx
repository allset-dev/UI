import { CN } from 'utils';

import './index.scss';

export interface ASButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text?: string;
  buttonStyle?: 'primary' | 'secondary' | 'primary-solid';
}

export function ASButton(props: ASButtonProps) {
  const {
    buttonStyle = 'primary-solid',
    children,
    className = '',
    text = '',
    type = 'button',
    ...restProps
  } = props;

  const buttonChildren = children || text;

  return (
    <button className={CN('as-button', `as-${buttonStyle}`, className)} type={type} {...restProps}>
      {buttonChildren}
    </button>
  );
}
