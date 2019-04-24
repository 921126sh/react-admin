import Axios, { AxiosRequestConfig } from 'axios';
import router from 'umi/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { AXIOS_DEFAULT_CONFIG } from '@/config';
import { getCookie } from '@/utils/cookie';

Axios.defaults.timeout = AXIOS_DEFAULT_CONFIG.timeout;
Axios.defaults.baseURL = AXIOS_DEFAULT_CONFIG.baseURL;
Axios.defaults.withCredentials = AXIOS_DEFAULT_CONFIG.withCredentials;

function requestSuccess(config) {
  NProgress.start();
  const cookie = getCookie();
  if (cookie) {
    config.headers['Token'] = cookie;
  }
  return config;
}

function requestFail(error) {
  return Promise.reject(error);
}

/**
 * 응답성공 콜백
 * {
 *   data: any
 *   code: number,
 *   message: string,
 * }
 * @param response 응답 데이터
 * @return 응답 데이터
 */
function responseSuccess(response) {
  NProgress.done();
  return response;
}

/**
 * 응답실패 콜백
 * {
 *   data: any
 *   code: number,
 *   message: string,
 * }
 * @param error 에러
 * @return 에러
 */
function responseFail(error) {
  NProgress.done();
  return Promise.reject(error);
}

// HTTP 인터셉터
Axios.interceptors.request.use(requestSuccess, requestFail);
Axios.interceptors.response.use(responseSuccess, responseFail);

/**
 *
 * @param config
 */
export const request = (config: AxiosRequestConfig) => {
  return Axios(config)
    .then((response) => {
      const { data, code, message } = response.data;

      return {
        data: data || {},
        code,
        message
      };
    })
    .catch((error) => {
      if (!error.response) {
        return console.log('Error', error.message);
      }

      
      const code = error.response.code;
      if (code === 401) {
        router.push('/user/login');
      }
      
      console.log(`【${config.method} ${config.url}】 요청실패 응답 데이터：%o`, error.response);
      return { code, message: '' };
    });
};

export const Get = (
  url: string,
  params?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      params: params,
      method: 'get'
    })
  );
};

export const Post = (
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      data: data,
      method: 'post'
    })
  );
};

export const Put = (
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      data: data,
      method: 'put'
    })
  );
};

export const Delete = (
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      data: data,
      method: 'delete'
    })
  );
};
