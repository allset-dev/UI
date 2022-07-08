import { ASButton } from 'components';
import { ASInput } from 'components/inputs/input';
import { Pillaiyar } from 'static/svgs/pillaiyar';

import './index.scss';

export default function Login() {
  return (
    <div className="asb-login">
      <Pillaiyar className="asb-login-avatar" />
      <form className="asb-login-form">
        <ASInput className="asb-login-input" label="Email" id="asdasd" />
        <ASInput className="asb-login-input" label="Passpord" id="qweqw" />
        <div className="asb-login-button-group">
          <ASButton className="asb-login-button">Login</ASButton>
          <ASButton className="asb-login-button" buttonStyle="primary">
            I need help
          </ASButton>
        </div>
      </form>
    </div>
  );
}
