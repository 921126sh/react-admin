import React, { useState } from 'react';
import router from 'umi/router';
import { Button, Card, Tooltip, Form } from 'antd';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import DrawerWrapper from '@/components/drawer-wrapper';
import StandardTable from '@/components/standard-table';

const CreatePolicies: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const showCreateView = () => {
    setVisible(true);
  };

  const closeCreateView = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name'
    },
    {
      title: 'type',
      dataIndex: 'type'
    },
    {
      title: 'attachmentCount',
      dataIndex: 'attachmentCount'
    },
    {
      title: 'remark',
      dataIndex: 'remark'
    },
    {
      title: '수술',
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
        title="새 사용자 지정 권한 정책 만들기"
        extra={[
          <Button key="1" type="primary" onClick={showCreateView}>
            권한 추가
          </Button>
        ]}
      />

      <DrawerWrapper
        visible={visible}
        width={600}
        title="권한 추가"
        onClose={closeCreateView}
      >
        13
      </DrawerWrapper>

      <Card bordered={false}>
        <StandardTable
          list={[]}
          columns={columns}
        />
      </Card>
    </React.Fragment>
  )
};

export default CreatePolicies;
