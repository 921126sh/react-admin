import { MenuTheme } from 'antd/es/menu';

interface ISetting {
  menu: {
    disableLocal: boolean;
  },
  theme: MenuTheme;
  fixedHeader: boolean;
  autoHideHeader: boolean;
  fixedSide: boolean;
  iconFontUrl: string;
}

// AXIOS 기본 설정
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  withCredentials: true,
  // @ts-ignore
  baseURL: `${BASE_URL}/api/`,
};

// App 설정
export const APP_DEFAULT_CONFIG = {
  companyName: '(주)아이쿱',
  title: 'Clinic Admin Template',
  // TODO 의미파악할 것
  whiteList: ['/user/*']
};

// 스토리지 설정
export const STORAGE_KEY_DEFAULT_CONFIG = {
  loginType: 'login-type',
  tabListKey: 'tab-list',
  storageTabActiveKey: 'tab-active-key'
};

// UI기본 설정
export const SETTING_DEFAULT_CONFIG: ISetting = {
  menu: {
    disableLocal: false,
  },
  theme: 'dark',
  fixedHeader: false,
  autoHideHeader: false,
  fixedSide: false,
  iconFontUrl: ''
};
