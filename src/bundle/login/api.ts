import { API } from 'utils';

export const LoginApi = {
  login(abortSignal: AbortSignal, props: { email: string; password: string }) {
    return API.post('/auth/login', {
      signal: abortSignal,
      data: {
        email: props.email,
        password: props.password,
      },
    });
  },
};
