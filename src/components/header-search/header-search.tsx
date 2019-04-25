import React from 'react';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { Input, Icon, AutoComplete } from 'antd';
import { InputProps } from 'antd/es/input';
import './header-search.less';

interface IProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  placeholder: string;
  // 현재 프롬프트 목록
  dataSource: string[];
  defaultOpen?: boolean;
  open?: boolean;
  onPressEnter: (value: string) => void;
  onSearch: (value: string) => void;
  // option，또는 input 중 value 변경시 함수를 호출하십시오.
  onChange: (value: string) => void;
  onVisibleChange: (b: boolean) => void;
}

interface IState {
  readonly value: string;
  readonly searchMode: boolean;
}

export class HeaderSearch extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'lotus-header-search',
    defaultOpen: false,
  };

  render() {
    const { className, prefixCls, style } = this.props;
    return (
      <span
        className={classNames(className, {
          [`${prefixCls}`]: true
        })}
      >
        <Icon type="search" key="Icon" />
      </span>
    )
  }
}
