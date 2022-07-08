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
    className = '',
    children,
    text = '',
    buttonStyle = 'primary-solid',
    ...restProps
  } = props;

  const buttonChildren = children || text;

  return (
    <button className={CN('as-button', `as-${buttonStyle}`, className)} {...restProps}>
      {buttonChildren}
    </button>
  );
}
