// url유효성 검증 정규식
export const regexpMap = {
  urlRegexp: /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
};

/**
 * url유효성 여부를 반환한다.
 * @param value 검사값
 * @return 검사값
 */
export function isUrl(value: any): any {
  return regexpMap.urlRegexp.test(value);
}
