import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

interface CustomAxiosConfig extends AxiosRequestConfig {
  skipBaseURL?: boolean;
  skipDataStringify?: boolean;
}

function getAxiosApis(baseURL: string) {
  axios.interceptors.response.use(handleOnSuccess, handleOnReject);

  function requestWithoutData(method: Method) {
    return (url: string, config: CustomAxiosConfig = {}) => {
      return axios(getAxiosConfig({ baseURL, method, url, ...config }));
    };
  }

  function requestWithData(method: Method) {
    return (url: string, data: any, config: CustomAxiosConfig = {}) => {
      return axios(getAxiosConfig({ baseURL, method, url, data, ...config }));
    };
  }

  return {
    get: requestWithoutData('GET'),
    delete: requestWithData('DELETE'),
    post: requestWithData('POST'),
    put: requestWithData('PUT'),
    patch: requestWithData('PATCH'),
  };
}

function getAxiosConfig(props: CustomAxiosConfig): AxiosRequestConfig {
  const {
    baseURL,
    data = {},
    method,
    skipBaseURL = false,
    skipDataStringify = false,
    url,
    ...restConfig
  } = props;

  return {
    baseURL: skipBaseURL ? '' : baseURL,
    method,
    url,

    // header
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,

    // data
    data: skipDataStringify ? data : JSON.stringify(data),

    // user configuration
    ...restConfig,
  };
}

function handleOnSuccess(response: AxiosResponse<any, any>) {
  return response;
}

function handleOnReject(error: any) {
  if (axios.isCancel(error)) {
    return Promise.reject({ cancelled: true, message: 'Request cancelled' });
  } else {
    return Promise.reject(error);
  }
}

export const API = getAxiosApis('');
