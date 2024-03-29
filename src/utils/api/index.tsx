import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

interface CustomAxiosConfig extends AxiosRequestConfig {
  skipDataStringify?: boolean;
}

function getAxiosApis(baseURL?: string) {
  axios.interceptors.response.use(handleOnSuccess, handleOnReject);

  function requestWithoutData(method: Method) {
    return async <T,>(url: string, config: CustomAxiosConfig = {}): Promise<T> => {
      const res: AxiosResponse<T> = await axios(
        getAxiosConfig({ baseURL, method, url, ...config })
      );

      return res.data;
    };
  }

  function requestWithData(method: Method) {
    return async <T,>(url: string, data: any, config: CustomAxiosConfig = {}): Promise<T> => {
      const res: AxiosResponse<T> = await axios(
        getAxiosConfig({ baseURL, method, url, data, ...config })
      );

      return res.data;
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
  const { baseURL, data = {}, method, skipDataStringify = false, url, ...restConfig } = props;

  const isOutsideSource = url.startsWith('http') || url.startsWith('https');
  const addedBackSlash = url.startsWith('/') ? url : `/${url}`;

  return {
    baseURL,
    method,
    url: isOutsideSource ? url : `/api${addedBackSlash}`,

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

function handleOnReject(error: Error) {
  if (axios.isCancel(error)) {
    return Promise.reject(new Error('Request cancelled'));
  } else {
    return Promise.reject(error);
  }
}

export const API = getAxiosApis(process.env.API_PROXY);
