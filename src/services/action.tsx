import { Get, Post, Put, Delete } from '@/utils/request';

export function fetchList(params) {
  return Get('/actions/list', params);
}

export async function fetchCreate(data) {
  return Post('/actions/create', data);
}

export function fetchRemove(ids) {
  return Delete('/actions/remove', ids);
}

export function fetchUpdate(data) {
  return Put('/actions/update', data);
}
