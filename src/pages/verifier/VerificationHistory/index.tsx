import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Empty, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo } from 'react';
import { useDatasets } from '@/contexts/DatasetContext';
import type { ReviewHistoryEntry } from '@/data/datasets';

const { Text } = Typography;

interface HistoryRecord extends ReviewHistoryEntry {
  datasetId: number;
  datasetName: string;
  createdBy?: string;
  location: string;
}

const VerificationHistoryPage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const { datasets } = useDatasets();

  const historyRecords = useMemo<HistoryRecord[]>(
    () =>
      datasets
        .flatMap((dataset) =>
          (dataset.reviewHistory || [])
            .filter((entry) => entry.reviewedBy === currentUser?.email)
            .map((entry) => ({
              ...entry,
              datasetId: dataset.id,
              datasetName: dataset.name,
              createdBy: dataset.createdBy,
              location: dataset.location,
            })),
        )
        .sort(
          (a, b) =>
            new Date(b.reviewedAt).getTime() - new Date(a.reviewedAt).getTime(),
        ),
    [datasets, currentUser?.email],
  );

  const columns: ColumnsType<HistoryRecord> = [
    {
      title: 'Dataset Name',
      dataIndex: 'datasetName',
      key: 'datasetName',
      render: (value: string) => <Text strong>{value}</Text>,
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
      title: 'Decision',
      dataIndex: 'decision',
      key: 'decision',
      render: (decision: HistoryRecord['decision']) => (
        <Tag
          color={
            decision === 'Verified'
              ? 'success'
              : decision === 'Rejected'
                ? 'error'
                : 'warning'
          }
        >
          {decision}
        </Tag>
      ),
    },
    {
      title: 'Reviewed At',
      dataIndex: 'reviewedAt',
      key: 'reviewedAt',
      render: (value: string) => new Date(value).toLocaleString('en-GB'),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      render: (value?: string) => value || '-',
    },
  ];

  return (
    <PageContainer
      title="Verification History"
      subTitle="View your previous dataset review decisions."
    >
      <Card>
        <Table<HistoryRecord>
          rowKey="id"
          columns={columns}
          dataSource={historyRecords}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 900 }}
          locale={{
            emptyText: (
              <Empty description="No verification history available" />
            ),
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default VerificationHistoryPage;
