import { ASInput, ASInputProps } from './input';

interface ASInputType extends ASInputProps {
  inputType: 'input' | undefined | '';
}

type ASAllInput = ASInputType;

export function ASAllInput(props: ASAllInput) {
  const { inputType, ...restProps } = props;

  switch (inputType) {
    case 'input':
    default: {
      return <ASInput {...restProps} />;
    }
  }
}
