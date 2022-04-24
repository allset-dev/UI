import { createElement } from 'react';

import { CN } from 'utils';

import './index.scss';

export function ASText(props: any) {
  const { className = '', children, text, ...restProps } = props;

  const localText = children || text;

  return <TextEl {...restProps} text={localText} className={CN('as-text', className)} />;
}

function TextEl(props: any) {
  const { tag = 'p', text, ...restProps } = props;

  return createElement(tag, restProps, text);
}
