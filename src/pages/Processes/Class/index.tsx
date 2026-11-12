import { PageContainer } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import {
  Breadcrumb,
  Button,
  Card,
  Empty,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';
import { useDatasets } from '@/contexts/DatasetContext';
import type { Dataset, DatasetStatus } from '@/data/datasets';
import { isicRev5Sections } from '@/data/isicRev5';

const { Text, Title } = Typography;

const ClassPage: React.FC = () => {
  const { classCode } = useParams<{ classCode: string }>();
  const { datasets } = useDatasets();
  const [searchText, setSearchText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>();
  const [selectedType, setSelectedType] = useState<string>();

  // Mencari Class beserta hierarki induknya.
  const classHierarchy = useMemo(() => {
    for (const section of isicRev5Sections) {
      for (const division of section.divisions) {
        for (const group of division.groups) {
          const foundClass = group.classes.find(
            (item) => item.code === classCode,
          );

          if (foundClass) {
            return {
              section,
              division,
              group,
              classItem: foundClass,
            };
          }
        }
      }
    }

    return null;
  }, [classCode]);

  // Mengambil dataset berdasarkan ISIC Class.
  const filteredDatasets = useMemo(() => {
    return datasets.filter((dataset) => {
      const matchesClass = dataset.classCode === classCode;

      const matchesSearch =
        dataset.name.toLowerCase().includes(searchText.toLowerCase()) ||
        dataset.reference.toLowerCase().includes(searchText.toLowerCase());

      const matchesLocation =
        !selectedLocation || dataset.location === selectedLocation;

      const matchesType = !selectedType || dataset.type === selectedType;

      return matchesClass && matchesSearch && matchesLocation && matchesType;
    });
  }, [datasets, classCode, searchText, selectedLocation, selectedType]);

  const columns: ColumnsType<Dataset> = [
    {
      title: 'Index',
      dataIndex: 'id',
      width: 75,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (value: string) => <Text strong>{value}</Text>,
    },
    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Type of Dataset',
      dataIndex: 'type',
      render: (value: string) => <Tag color="blue">{value}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 160,
      render: (value: DatasetStatus) => {
        const statusColors: Record<DatasetStatus, string> = {
          Draft: 'default',
          Submitted: 'blue',
          'Under Review': 'processing',
          'Revision Required': 'warning',
          Verified: 'success',
          Rejected: 'error',
        };

        return <Tag color={statusColors[value]}>{value}</Tag>;
      },
    },
    {
      title: 'Updated at',
      dataIndex: 'updatedAt',
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
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

  if (!classHierarchy) {
    return (
      <PageContainer title="ISIC Class">
        <Empty description={`ISIC Class ${classCode} tidak ditemukan.`} />
      </PageContainer>
    );
  }

  const { section, division, group, classItem } = classHierarchy;

  return (
    <PageContainer title="ISIC Class Details" breadcrumbRender={false}>
      <Breadcrumb
        items={[
          { title: 'Processes' },
          { title: `Section ${section.code}` },
          { title: `Division ${division.code}` },
          { title: `Group ${group.code}` },
          { title: `Class ${classItem.code}` },
        ]}
        style={{ marginBottom: 20 }}
      />

      <Card style={{ marginBottom: 24 }}>
        <Space direction="vertical" size={8}>
          <Text type="secondary">ISIC Revision 5</Text>
          <Title level={3} style={{ margin: 0 }}>
            {classItem.code} | {classItem.name}
          </Title>
          <Text type="secondary">
            {section.code} {section.name} / Division {division.code}{' '}
            {division.name}
          </Text>
          <Text type="secondary">
            Group {group.code} {group.name}
          </Text>
        </Space>
      </Card>

      <Card
        title="Dataset List"
        extra={
          <Space>
            <Text type="secondary">{filteredDatasets.length} datasets</Text>
            <Button
              type="primary"
              onClick={() =>
                history.push(`/datasets/new?classCode=${classCode}`)
              }
            >
              Add Dataset
            </Button>
          </Space>
        }
      >
        <Space wrap style={{ width: '100%', marginBottom: 20 }}>
          <Input
            placeholder="Search dataset..."
            allowClear
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            style={{ width: 240 }}
          />

          <Select
            placeholder="Filter by location"
            allowClear
            value={selectedLocation}
            onChange={setSelectedLocation}
            style={{ width: 180 }}
            options={[
              { label: 'Indonesia', value: 'Indonesia' },
              { label: 'Southeast Asia', value: 'Southeast Asia' },
            ]}
          />

          <Select
            placeholder="Filter by dataset type"
            allowClear
            value={selectedType}
            onChange={setSelectedType}
            style={{ width: 180 }}
            options={[
              { label: 'Unit process', value: 'Unit process' },
              { label: 'System process', value: 'System process' },
            ]}
          />
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
          scroll={{ x: 1000 }}
          locale={{
            emptyText: <Empty description="No datasets available" />,
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default ClassPage;
