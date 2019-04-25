import { Get, Post, Delete } from '@/utils/request';

export function fetchList(params) {
  return Get('/permissions/list', params);
}

export function fetchRemove(ids) {
  return Post('/permissions/remove', ids);
}
