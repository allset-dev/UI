import { ASText } from 'components';
import { CN } from 'utils';

import './index.scss';

export interface ASInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
}

export function ASInput(props: ASInputProps) {
  const { className, label, id, ...restProps } = props;

  const inputComponent = (
    <input className={CN('as-input', className)} id={id} name={id} {...restProps} />
  );

  if (label) {
    return (
      <label title={label} htmlFor={id}>
        <ASText tag="h3">{label}</ASText>
        {inputComponent}
      </label>
    );
  }

  return inputComponent;
}
