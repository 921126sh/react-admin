import { Get, Post } from '@/utils/request';

export function fetchLogin(data) {
  return Post('/users/login', data);
}

export function fetchLogout() {
  return Get('/users/logout');
}

export async function fetchCurrent() {
  return Get('/users/current');
}

export function fetchResetPassword(data) {
  return Post('/users/reset-password', data);
}


