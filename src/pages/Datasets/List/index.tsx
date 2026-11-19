import { PageContainer } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Button, Card, Col, Input, Row, Select, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';
import { useDatasets } from '@/contexts/DatasetContext';
import type { Dataset } from '@/data/datasets';

const DatasetListPage: React.FC = () => {
  const { datasets } = useDatasets();

  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  const isAdmin = currentUser?.role === 'admin';
  const isContributor = currentUser?.role === 'contributor';

  const visibleDatasets = useMemo(() => {
    if (isAdmin) {
      return datasets;
    }

    if (isContributor && currentUser?.email) {
      return datasets.filter(
        (dataset) => dataset.createdBy === currentUser.email,
      );
    }

    return [];
  }, [datasets, isAdmin, isContributor, currentUser?.email]);

  const summary = useMemo(
    () => [
      {
        title: 'Total Datasets',
        value: visibleDatasets.length,
      },
      {
        title: 'Draft',
        value: visibleDatasets.filter((item) => item.status === 'Draft').length,
      },
      {
        title: 'Under Review',
        value: visibleDatasets.filter((item) => item.status === 'Under Review')
          .length,
      },
      {
        title: 'Verified',
        value: visibleDatasets.filter((item) => item.status === 'Verified')
          .length,
      },
    ],
    [visibleDatasets],
  );

  const canAddDataset =
    currentUser?.role === 'admin' || currentUser?.role === 'contributor';

  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const handleSummaryClick = (status: string) => {
    setStatusFilter(status);
  };
  const [createdByFilter, setCreatedByFilter] = useState<string>('all');
  const getStatusColor = (status: Dataset['status']) => {
    const colors: Record<Dataset['status'], string> = {
      Draft: 'default',
      Submitted: 'blue',
      'Under Review': 'processing',
      'Revision Required': 'warning',
      Verified: 'success',
      Rejected: 'error',
    };

    return colors[status];
  };

  const createdByOptions = useMemo(() => {
    const users = Array.from(
      new Set(visibleDatasets.map((dataset) => dataset.createdBy || 'Unknown')),
    );

    return [
      { label: 'All Contributors', value: 'all' },
      ...users.map((user) => ({
        label: user,
        value: user,
      })),
    ];
  }, [visibleDatasets]);

  const filteredDatasets = useMemo(() => {
    return visibleDatasets.filter((dataset) => {
      const searchValue = searchText.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        dataset.name.toLowerCase().includes(searchValue) ||
        dataset.location.toLowerCase().includes(searchValue) ||
        dataset.classCode.toLowerCase().includes(searchValue) ||
        (dataset.createdBy || 'Unknown').toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === 'all' || dataset.status === statusFilter;

      const matchesCreatedBy =
        createdByFilter === 'all' ||
        (dataset.createdBy || 'Unknown') === createdByFilter;

      return matchesSearch && matchesStatus && matchesCreatedBy;
    });
  }, [visibleDatasets, searchText, statusFilter, createdByFilter]);

  const columns: ColumnsType<Dataset> = [
    {
      title: 'Process Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Class Code',
      dataIndex: 'classCode',
      key: 'classCode',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (value) => value || 'Unknown',
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
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => history.push(`/datasets/new/detail/${record.id}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <PageContainer
      title={isAdmin ? 'Dataset List' : 'My Datasets'}
      subTitle={
        isAdmin
          ? 'Browse and manage all Life Cycle Inventory datasets.'
          : 'Browse and manage the datasets you have created.'
      }
      extra={
        canAddDataset
          ? [
              <Button
                key="add"
                type="primary"
                onClick={() => history.push('/datasets/new')}
              >
                Add Dataset
              </Button>,
            ]
          : []
      }
    >
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {summary.map((item) => (
          <Col xs={24} sm={12} lg={6} key={item.title}>
            <Card
              hoverable
              onClick={() =>
                handleSummaryClick(
                  item.title === 'Total Datasets' ? 'all' : item.title,
                )
              }
              style={{
                cursor: 'pointer',
                borderColor:
                  statusFilter ===
                  (item.title === 'Total Datasets' ? 'all' : item.title)
                    ? '#1677ff'
                    : undefined,
              }}
            >
              <div style={{ color: '#8c8c8c', marginBottom: 8 }}>
                {item.title}
              </div>
              <div style={{ fontSize: 28, fontWeight: 600 }}>{item.value}</div>
            </Card>
          </Col>
        ))}
      </Row>
      <Space size="middle" wrap style={{ marginBottom: 16, width: '100%' }}>
        <Input
          placeholder="Search datasets..."
          allowClear
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          style={{ width: 260 }}
        />

        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 180 }}
          options={[
            { label: 'All Statuses', value: 'all' },
            { label: 'Draft', value: 'Draft' },
            { label: 'Submitted', value: 'Submitted' },
            { label: 'Under Review', value: 'Under Review' },
            { label: 'Revision Required', value: 'Revision Required' },
            { label: 'Verified', value: 'Verified' },
            { label: 'Rejected', value: 'Rejected' },
          ]}
        />
        {currentUser?.role === 'admin' && (
          <Select
            value={createdByFilter}
            onChange={setCreatedByFilter}
            style={{ width: 220 }}
            options={createdByOptions}
            showSearch
            optionFilterProp="label"
            placeholder="Filter by contributor"
          />
        )}
      </Space>

      <Table<Dataset>
        rowKey="id"
        columns={columns}
        dataSource={filteredDatasets}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} datasets`,
        }}
      />
    </PageContainer>
  );
};

export default DatasetListPage;
