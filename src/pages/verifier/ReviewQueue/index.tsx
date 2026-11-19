import { PageContainer } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Card, Empty, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { useDatasets } from '@/contexts/DatasetContext';
import type { Dataset } from '@/data/datasets';

const { Text } = Typography;

const ReviewQueuePage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  const { datasets } = useDatasets();

  const reviewDatasets = useMemo(
    () =>
      datasets.filter(
        (dataset) =>
          (dataset.status === 'Submitted' ||
            dataset.status === 'Under Review') &&
          dataset.createdBy !== currentUser?.email,
      ),
    [datasets, currentUser?.email],
  );

  const columns: ColumnsType<Dataset> = [
    {
      title: 'Dataset Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (value?: string) => value || '-',
    },
    {
      title: 'ISIC Class',
      dataIndex: 'classCode',
      key: 'classCode',
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Dataset['status']) => (
        <Tag color={status === 'Submitted' ? 'blue' : 'processing'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <a onClick={() => history.push(`/verifier/datasets/${record.id}`)}>
          Review
        </a>
      ),
    },
  ];

  return (
    <PageContainer
      title="Review Queue"
      subTitle="Review and verify submitted LCI datasets."
    >
      <Card>
        <Table<Dataset>
          rowKey="id"
          columns={columns}
          dataSource={reviewDatasets}
          pagination={{ pageSize: 10 }}
          locale={{
            emptyText: <Empty description="No datasets waiting for review" />,
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default ReviewQueuePage;
