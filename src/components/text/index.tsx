import { ReactHTML, ReactNode, createElement } from 'react';

import { CN } from 'utils';

import './index.scss';

interface ASTextProps {
  className?: string;
  children?: ReactNode;
  tag?: keyof ReactHTML;
  text?: string;
  style?: 'error' | 'success' | 'helptext' | 'warning';
}

export function ASText(props: ASTextProps) {
  const { className = '', children, text, tag = 'p', style } = props;

  const localText = children || text || '';

  return createElement(
    tag,
    { className: CN('as-text', className, style && `as-${style}`) },
    localText
  );
}
