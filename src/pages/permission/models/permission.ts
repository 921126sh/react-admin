import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchList } from '@/services/permission';

export interface IPermission {
  id?: string;
  // 권한 정책 이름
  name?: string;
  // 권한 정책 유형 0 : 시스템 1 : 사용자
  type?: number;
  // 인용 횟수
  attachmentCount?: number;
  // 비고
  remark?: string;
}

export interface IPermissionModelState {
  list: IPermission[];
}

export interface IPermissionModel {
  namespace: 'permission',
  state: IPermissionModelState,
  effects: {
    fetchList: Effect;
  },
  reducers: {
    saveList: Reducer<any>;
  }
}

const PermissionModel: IPermissionModel = {
  namespace: 'permission',
  state: {
    list: []
  },
  effects: {
    *fetchList({ payload }, { call, put, select }) {
      const response = yield call(fetchList, payload);

    }
  },
  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload
      };
    }
  }
};

export default PermissionModel;
