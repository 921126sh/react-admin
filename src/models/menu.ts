import { Reducer } from 'redux';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi-plugin-react/locale';
import { Effect } from '@/models/connect';
import { IMenu } from '@/components/side-menu';
import { SETTING_DEFAULT_CONFIG } from '@/config';

const { menu } = SETTING_DEFAULT_CONFIG;

// 라우팅 데이터를 메뉴 데이터로 변환
function formatter(
  data: IRoute[],
  parentAuthority?: string[] | string,
  parentName?: string,
): IMenu[] {
  return data
    .filter(item => item.name && item.path)
    .map(item => {
      const locale = `${parentName || 'menu'}.${item.name!}`;
      // if enableMenuLocale use item.name,
      // close menu international
      const name = menu.disableLocal
        ? item.name!
        : formatMessage({ id: locale, defaultMessage: item.name! });
      const result: IMenu = {
        ...item,
        name,
        locale,
        routes: void 0,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        // Reduce memory usage
        result.children = formatter(item.routes, item.authority, locale);
      }
      return result;
    });
}

// 이동 경로 매핑 가져 오기
const getBreadcrumbNameMap = (menuData: IMenu[]) => {
  const routerMap: { [key: string]: IMenu } = {};
  const flattenMenuData: (data: IMenu[]) => void = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneFormatter = memoizeOne(formatter, isEqual);
const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

const filterMenuData = (menuData: IMenu[] = []): IMenu[] => {
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .filter(item => item);
};

export interface IRoute extends IMenu {
  routes?: IMenu[];
  component?: string;
  Routes?: string[];
  redirect?: string;
}

export interface IMenuModelState {
  menuData: IMenu[];
  routerData: IRoute[];
  breadcrumbNameMap: object;
}

export interface IMenuModel {
  namespace: 'menu',
  state: IMenuModelState,
  effects: {
    getMenuData: Effect;
  },
  reducers: {
    saveState: Reducer<any>;
  };
}

const MenuModel: IMenuModel = {
  namespace: 'menu',
  state: {
    menuData: [],
    routerData: [],
    breadcrumbNameMap: {}
  },
  effects: {
    *getMenuData({ payload, callback }, { put }) {
      const { routes, authority } = payload;
      const originalMenuData = memoizeOneFormatter(routes, authority);
      const menuData = filterMenuData(originalMenuData);
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);

      yield put({
        type: 'saveState',
        payload: {
          menuData,
          breadcrumbNameMap,
          routerData: routes
        }
      });

      callback && callback();
    }
  },
  reducers: {
    saveState(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
};

export default MenuModel;
