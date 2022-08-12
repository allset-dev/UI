import { CN } from 'utils';

export function ASForm(props: any) {
  const { children, className = '', ...restProps } = props;

  return (
    <form className={CN('as-form', className)} {...restProps}>
      {children}
    </form>
  );
}
