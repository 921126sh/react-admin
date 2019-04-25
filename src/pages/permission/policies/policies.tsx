import React from 'react';
import router from 'umi/router';
import { Typography, Button, Card, Tooltip, Modal } from 'antd';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import StandardTable from '@/components/standard-table';
import { ConnectProps } from '@/models/connect';
import './policies.less';

interface IProps extends ConnectProps {
  prefixCls?: string;
}

const { Paragraph } = Typography;
const confirm = Modal.confirm;

const PoliciesPage: React.FC<IProps> = (props) => {
  const { prefixCls } = props;

  const showCreateView = () => {
    router.push('/permission/policies/create');
  };

  // 권한정책 삭제
  const handleConfirmRemove = (record) => {
    confirm({
      title: `${record.name}를 삭제 하시겠습니까?`,
      content: '삭제는 복구 할 수 없습니다.',
      okText: '확인',
      okType: 'danger',
      cancelText: '취소',
      onOk() {
        handleRemove(record);
      }
    });
  };

  const handleRemove = (record) => {

  };

  const list = [
    {
      id: '1',
      name: '홍길동',
      attachmentCount: 32,
      remark: '???'
    },
    {
      id: '2',
      name: '이순신',
      attachmentCount: 42,
      remark: '????'
    }
  ];

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
      title: 'action',
      key: 'action',
      render: (text, record) => (
        <Tooltip placement="top" title="删除">
          <Button
            type="danger"
            size="small"
            icon="delete"
            onClick={() => {
              handleConfirmRemove(record);
            }}
          />
        </Tooltip>
      )
    }
  ];

  return (
    <React.Fragment>
      <PageHeaderWrapper
        title="플랫폼에서 관리하는 시스템 액세스 정책과 클라이언트에서 관리하는 사용자 지정 액세스 정책의 두 가지 유형의 인증 정책이 지원됩니다."
        extra={[
          <Button key="1" type="primary" onClick={showCreateView}>
            신규
          </Button>
        ]}
      >
        <div className="content">
          <Paragraph>
            - 시스템 액세스 정책, 플랫폼에 의한 통합 작성의 경우 사용자는 수정할 수만 있지만 수정할 수는 없으며 시스템 액세스 정책의 버전 업데이트는 플랫폼에서 유지 관리됩니다.
          </Paragraph>
          <Paragraph>
            - 사용자 지정 액세스 정책의 경우 사용자가 직접 만들고 업데이트하고 삭제할 수 있습니다. 사용자 지정된 정책의 버전 업데이트는 고객이 자체적으로 관리합니다.
          </Paragraph>
        </div>
      </PageHeaderWrapper>
      <div className={prefixCls}>
        <Card bordered={false}>
          <StandardTable
            list={list}
            columns={columns}
          />
        </Card>
      </div>
    </React.Fragment>
  )
};

PoliciesPage.defaultProps = {
  prefixCls: 'lotus-policies-page'
};

export default PoliciesPage;
