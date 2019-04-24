import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchCurrent } from '@/services/user';

export interface ICurrentUser {
  name?: string;
  avatar?: string;
  email?: string;
}

export interface IUserModelState {
  currentUser: ICurrentUser;
  isSuperAdmin: boolean;
}

export interface IUserModel {
  namespace: 'user';
  state: IUserModelState;
  effects: {
    // 현재 사용자 정보
    fetchCurrent: Effect;
  },
  reducers: {
    saveCurrentUser: Reducer<any>;
    changeNotifyCount: Reducer<any>;
  }
}

const UserModel: IUserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    isSuperAdmin: false
  },
  effects: {
    // 현재 사용자 정보를 얻어온다.
    *fetchCurrent(_, { call, put }) {
      const response = yield call(fetchCurrent);
      if (response && response.code === 200) {
        const info = response.data || {};
        yield put({
          type: 'saveCurrentUser',
          payload: {
            ...info
          }
        });
      }
    },
  },
  reducers: {
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload
      };
    },
    changeNotifyCount(state, { payload }) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: payload.totalCount,
          unreadCount: payload.unreadCount
        }
      };
    }
  }
};

export default UserModel;
