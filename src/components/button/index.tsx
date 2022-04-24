import { CN } from 'utils';

import './index.scss';

export function ASButton(props: any) {
  const { className = '', children, text = '', ...restProps } = props;

  const buttonChildren = children || text;

  return (
    <button className={CN('as-button', className)} {...restProps}>
      {buttonChildren}
    </button>
  );
}
