import { ASButton, ASInput } from 'components';
import { useApi, useTranslation } from 'utils';

import { Pillaiyar } from 'static/svgs/pillaiyar';

import './index.scss';

import { LoginApi } from './api';

export default function Login() {
  const { t } = useTranslation();

  const { fetch: checkLogin } = useApi(LoginApi.login);

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    try {
      const response = await checkLogin({ email: email.trim(), password: password.trim() });
      console.log('response', response);
    } catch {
      //
    }
  }

  return (
    <div className="asb-login">
      <Pillaiyar className="asb-login-avatar" />
      <form className="asb-login-form" onSubmit={handleOnSubmit}>
        <ASInput type="email" required className="asb-login-input" label="Email" id="email" />
        <ASInput
          type="password"
          required
          className="asb-login-input"
          label="Passpord"
          id="password"
        />
        <div className="asb-login-button-group">
          <ASButton className="asb-login-button" type="submit">
            {t('login')}
          </ASButton>
          <ASButton className="asb-login-button" buttonStyle="primary">
            {t('iNeedHelp')}
          </ASButton>
        </div>
      </form>
    </div>
  );
}
