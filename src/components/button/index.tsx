import { CN } from 'utils';

import './index.scss';

export interface ASButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text?: string;
}

export function ASButton(props: ASButtonProps) {
  const { className = '', children, text = '', ...restProps } = props;

  const buttonChildren = children || text;

  return (
    <button className={CN('as-button', className)} {...restProps}>
      {buttonChildren}
    </button>
  );
}
