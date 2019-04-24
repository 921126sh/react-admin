// https://umijs.org/zh/guide/runtime-config.html
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import router from 'umi/router';
import { APP_DEFAULT_CONFIG } from '@/config';
import { getCookie } from '@/utils/cookie';

const { whiteList } = APP_DEFAULT_CONFIG;

export function onRouteChange({ location }) {
  const token = getCookie();
  let isLogin = true;

  // 로그인 상태를 확인한다.
  whiteList.forEach(item => {
    if (pathToRegexp(item).test(location.pathname)) {
      isLogin = false;
    }
  });

  // 로그인 필요 할 경우...
  // if (!token && isLogin) {
  //   message.warning('登录已过期，请重新登录！');
  //   router.push('/user/login');
  //   return;
  // }

  // 로그인 일 경우
  if (token && !isLogin) {
    router.push('/dashboard');
  }
}

// 전체 서비스를 재 실행한다.
export function render(oldRender) {
  oldRender();
}
