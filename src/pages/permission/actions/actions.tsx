import React from 'react';
import { connect } from 'dva';
import {Button, Card, Tooltip, Typography} from 'antd';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import StandardTable from '@/components/standard-table';
import { ConnectProps } from '@/models/connect';

interface IProps extends ConnectProps {

}

const { Paragraph } = Typography;

const ActionPage: React.FC<IProps> = (props) => {
  const { dispatch } = props;

  const columns = [
    {
      title: 'mould',
      dataIndex: 'mould'
    },
    {
      title: 'type',
      dataIndex: 'type'
    },
    {
      title: 'type',
      dataIndex: 'type'
    },
    {
      title: 'remark',
      dataIndex: 'remark'
    },
    {
      title: 'action',
      key: 'action',
      render: (text, record) => (
        <Tooltip placement="top" title="삭제">
          <Button
            type="danger"
            size="small"
            icon="delete"
          />
        </Tooltip>
      )
    }
  ];

  return (
    <React.Fragment>
      <PageHeaderWrapper
        title="운영 관리"
        extra={[
          <Button key="1" type="primary" >
            새로운 작업
          </Button>
        ]}
      >
        <div className="content">
          <Paragraph>
          작업은 특정 리소스에 대한 작업입니다. 대부분의 경우 Action은 시스템의 API에 해당하지만 예외가 있습니다.
          </Paragraph>
        </div>
      </PageHeaderWrapper>
      <div>
        <Card bordered={false}>
          <StandardTable
            list={[]}
            columns={columns}
          />
        </Card>
      </div>
    </React.Fragment>
  )
};

export default connect(({  }) => ({

}))(ActionPage);
