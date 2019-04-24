import React from 'react';
import Link from 'umi/link';
import { Menu } from 'antd';
import { MenuMode, MenuTheme } from 'antd/es/menu';
import { urlToList } from '@/utils/path-tools';
import { ConnectProps } from '@/models/connect';
import { getIcon, getMenuMatches } from './utils';

export interface IMenu {
  authority?: string[] | string;
  children?: IMenu[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  path: string;
  [key: string]: any;
}

export interface IBaseMenuProps extends Required<ConnectProps> {
  className?: string;
  style?: React.CSSProperties;
  // 접힘/펼치 여부
  collapsed?: boolean;
  flatMenuKeys?: any[];
  isMobile?: boolean;
  // 菜单数据
  menuData?: IMenu[];
  // 菜单类型
  mode?: MenuMode;
  // 菜单主题
  theme?: MenuTheme;
  // 打开的菜单Key
  openKeys?: string[];
  // 菜单 展开/关闭 的回调
  onOpenChange?: (openKeys: string[]) => void;
  onCollapse?: (collapsed: boolean) => void;
}

const { SubMenu } = Menu;

class BaseMenu extends React.Component<IBaseMenuProps, any> {
  static defaultProps: Partial<IBaseMenuProps> = {
    flatMenuKeys: [],
    onCollapse: () => void 0,
    isMobile: false,
    openKeys: [],
    collapsed: false,
    menuData: [],
    onOpenChange: () => void 0
  };

  /**
   * 네비항목을 반환한다.
   * 
   * @param menusData 메뉴데이터 목록
   * @return 네비항목
   */
  getNavMenuItems = (menusData: IMenu[] = []): React.ReactNode[] => {
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item))
      .filter(item => item);
  };

  /**
   * 서브메뉴 또는 항목을 반환한다.
   * 
   * @param item 메뉴
   * @return 서브메뉴 또는 항목
   */
  getSubMenuOrItem = (item: IMenu): React.ReactNode => {
    if (
      Array.isArray(item.children) &&
      !item.hideChildrenInMenu &&
      item.children.some(child => !!child.name)
    ) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </span>
            ) : (
                item.name
              )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }

    return (
      <Menu.Item
        key={item.path}
      >
        {this.getMenuItemPath(item)}
      </Menu.Item>
    );
  };

  /**
   * 메뉴항목을 반환한다.
   * 
   * @param item 항목
   * @return 메뉴항목
   */
  getMenuItemPath = (item: IMenu) => {
    const { location, isMobile, onCollapse } = this.props;
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location!.pathname}
        onClick={isMobile ? () => onCollapse!(true) : void 0}
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  /**
   * 경로를 변환하여 반환한다.
   * 
   * @param path 경로
   * @return 메뉴항목
   */
  conversionPath = (path: string) => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  /**
   * 선택된 메뉴키를 반환한다.
   * 
   * @param pathname 경로명
   * @return 선택된 메뉴키
   */
  getSelectedMenuKeys = (pathname: string): string[] => {
    const { flatMenuKeys } = this.props;
    return urlToList(pathname)
      .map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop())
      .filter(item => item) as string[];
  };

  render() {
    const {
      className,
      style,
      mode,
      theme,
      openKeys,
      menuData,
      collapsed,
      onOpenChange,
      location
    } = this.props;

    let selectedKeys = this.getSelectedMenuKeys(location!.pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }

    let props = {};
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys
      };
    }

    return (
      <Menu
        style={style}
        mode={mode}
        theme={theme}
        className={className}
        onOpenChange={onOpenChange}
        selectedKeys={selectedKeys}
        {...props}
      >
        {this.getNavMenuItems(menuData)}
      </Menu>
    )

  }
}

export default BaseMenu;
