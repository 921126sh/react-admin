import React from 'react';
import { Icon } from 'antd';
import { APP_DEFAULT_CONFIG } from '@/config';

const { companyName } = APP_DEFAULT_CONFIG;

const Copyright = () => {
  return (
    <div>
      Copyright <Icon type="copyright" /> 2019{companyName} 개발부
    </div>
  )
};

export default Copyright;