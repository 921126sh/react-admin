import { Get } from '@/utils/request';

// 메시지 알림 가져오기
export async function fetchNotices(params) {
  return Get('/notices', params);
}

// 인증 코드 받기
export async function fetchCaptcha(params) {
  return Get('/captcha', params);
}
