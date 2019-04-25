import React from 'react';
import { Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import IconFont from '@/components/icon-font';
import { urlToList } from '@/utils/path-tools';
import { isUrl } from '@/utils/utils';

// 아이콘 얻기
export const getIcon = (icon?: string | React.ReactNode) => {
  if (typeof icon === 'string') {
    if (isUrl(icon)) {
      return <Icon component={() => <img src={icon} alt="icon" className="side-menu__icon" />} />;
    }
    if (icon.startsWith('icon-')) {
      return <IconFont type={icon} />;
    }
    return <Icon type={icon} />;
  }
  return icon;
};

// 재귀 평평하게하는 데이터
export const getFlatMenuKeys = (menuData) => {
  let keys = [];
  menuData.forEach(item => {
    keys.push(item.path);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
};

// 일치하는 메뉴 가져 오기
export const getMenuMatches = (flatMenuKeys, path) =>
  flatMenuKeys.filter(item => {
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false;
  });

// 메뉴 하위 노드 가져 오기
export const getDefaultCollapsedSubMenus = props => {
  const {
    location: { pathname },
    flatMenuKeys,
  } = props;
  return urlToList(pathname)
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .filter(item => item)
    .reduce((acc, curr) => [...acc, curr], ['/']);
};
