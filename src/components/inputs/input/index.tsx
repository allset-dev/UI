import { ASText } from 'components';
import { CN, useTranslation } from 'utils';

import './index.scss';

export interface ASInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  error?: string;
}

export function ASInput(props: ASInputProps) {
  const { t } = useTranslation();

  const { className, label, id, error, required, ...restProps } = props;

  return (
    <label className={CN('as-input', error && 'as-input-error')} htmlFor={id}>
      {label && (
        <ASText className="as-input-label" tag="span">
          {label}
          {required && (
            <ASText tag="span" style="error">
              {t('*')}
            </ASText>
          )}
        </ASText>
      )}
      <input
        className={CN('as-input-input', className)}
        id={id}
        name={id}
        required={required}
        {...restProps}
      />
      {error && (
        <ASText className="as-input-error" tag="span" style="error">
          {error}
        </ASText>
      )}
    </label>
  );
}
