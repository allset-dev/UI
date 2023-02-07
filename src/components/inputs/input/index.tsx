import { ASText } from 'components';
import { CN } from 'utils';

import './index.scss';

export interface ASInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  error?: string;
}

export function ASInput(props: ASInputProps) {
  const { className, label, id, error = 'sdf', ...restProps } = props;

  return (
    <label className={CN('as-input', error && 'as-input-error')} htmlFor={id}>
      {label && (
        <ASText className="as-input-label" tag="span">
          {label}
        </ASText>
      )}
      <input className={CN('as-input-input', className)} id={id} name={id} {...restProps} />
      {error && (
        <ASText className="as-input-error" tag="span">
          {error}
        </ASText>
      )}
    </label>
  );
}
