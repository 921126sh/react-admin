/**
 * 세션값을 반환한다.
 * 
 * @param key 키
 * @return 세션값
 */
export function get(key: string) {
  if (!key) return;
  return JSON.parse(sessionStorage.getItem(key));
}

/**
 * 세션값을 설정한다.
 * 
 * @param key 키
 * @param values 값
 */
export function set(key: string, values: any) {
  if (!key) return;
  sessionStorage.setItem(key, JSON.stringify(values));
}

/**
 * 키에 해당하는 세션값을 제거한다.
 * 
 * @param key 키
 */
export function remove(key: string) {
  if (!key) return;
  sessionStorage.removeItem(key);
}

export default {get, set, remove}
