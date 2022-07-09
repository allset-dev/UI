import { ASInput, ASInputProps } from './input';

interface ASInputTypeInput extends ASInputProps {
  inputType: 'input' | undefined | '';
}

type ASAllInputProps = ASInputTypeInput;

export function ASAllInput(props: ASAllInputProps) {
  const { inputType, ...restProps } = props;

  switch (inputType) {
    case 'input':
    default: {
      return <ASInput {...restProps} />;
    }
  }
}

export * from './input';
