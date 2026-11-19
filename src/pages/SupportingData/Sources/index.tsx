import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Modal,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useSupportingData } from '@/contexts/SupportingDataContext';
import type { Source, SourceType } from '@/data/sources';

const sourceTypeOptions: SourceType[] = [
  'Journal Article',
  'Book',
  'Report',
  'Standard',
  'Website',
  'Other',
];

const SourcesPage: React.FC = () => {
  const { sources, addSource, updateSource, deleteSource } =
    useSupportingData();
  const { initialState } = useModel('@@initialState');
  const isAdmin = initialState?.currentUser?.role === 'admin';

  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const [editingSource, setEditingSource] = useState<Source | null>(null);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  const filteredSources = sources.filter((source) => {
    const keyword = searchText.toLowerCase();

    return (
      source.name.toLowerCase().includes(keyword) ||
      source.author.toLowerCase().includes(keyword) ||
      source.sourceType.toLowerCase().includes(keyword) ||
      String(source.publicationYear).includes(keyword)
    );
  });

  const handleAdd = () => {
    setEditingSource(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (source: Source) => {
    setEditingSource(source);
    form.setFieldsValue(source);
    setModalOpen(true);
  };

  const handleView = (source: Source) => {
    setSelectedSource(source);
    setViewOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteSource(id);
    message.success('Source deleted successfully.');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const source: Source = {
        id: editingSource
          ? editingSource.id
          : Math.max(0, ...sources.map((item) => item.id)) + 1,
        name: values.name.trim(),
        sourceType: values.sourceType,
        author: values.author.trim(),
        publicationYear: values.publicationYear,
        doi: values.doi?.trim() || undefined,
        url: values.url?.trim() || undefined,
        description: values.description?.trim() || '',
      };

      const success = editingSource ? updateSource(source) : addSource(source);

      if (!success) {
        message.error('Source name already exists.');
        return;
      }

      message.success(
        editingSource
          ? 'Source updated successfully.'
          : 'Source added successfully.',
      );

      setModalOpen(false);
      form.resetFields();
      setEditingSource(null);
    } catch {
      // Form validation handles invalid fields.
    }
  };

  const columns: ColumnsType<Source> = [
    {
      title: 'Source Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Typography.Text strong>{name}</Typography.Text>
      ),
    },
    {
      title: 'Source Type',
      dataIndex: 'sourceType',
      key: 'sourceType',
    },
    {
      title: 'Author / Organization',
      dataIndex: 'author',
      key: 'author',
      ellipsis: true,
    },
    {
      title: 'Publication Year',
      dataIndex: 'publicationYear',
      key: 'publicationYear',
      width: 140,
    },
    {
      title: 'DOI / URL',
      key: 'reference',
      ellipsis: true,
      render: (_, record) => record.doi || record.url || '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: isAdmin ? 150 : 80,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />

          {isAdmin && (
            <>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              />

              <Popconfirm
                title="Delete Source"
                description="Are you sure you want to delete this Source?"
                onConfirm={() => handleDelete(record.id)}
                okText="Delete"
                cancelText="Cancel"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="Sources"
      content="Manage references and information sources used in LCI datasets."
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Total Sources" value={sources.length} />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Journal Articles"
              value={
                sources.filter(
                  (source) => source.sourceType === 'Journal Article',
                ).length
              }
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Standards"
              value={
                sources.filter((source) => source.sourceType === 'Standard')
                  .length
              }
            />
          </Card>
        </Col>
      </Row>

      <Card
        style={{ marginTop: 16 }}
        title="Source List"
        extra={
          isAdmin && (
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Add Source
            </Button>
          )
        }
      >
        <Input
          allowClear
          placeholder="Search by name, author, type, or year..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          style={{ width: 340, maxWidth: '100%', marginBottom: 16 }}
        />

        <Table<Source>
          rowKey="id"
          columns={columns}
          dataSource={filteredSources}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 1000 }}
        />
      </Card>

      <Modal
        title={editingSource ? 'Edit Source' : 'Add Source'}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingSource(null);
          form.resetFields();
        }}
        onOk={handleSubmit}
        okText={editingSource ? 'Save Changes' : 'Add'}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
          <Form.Item
            label="Source Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter the Source name.',
              },
            ]}
          >
            <Input placeholder="Enter source title or name" />
          </Form.Item>

          <Form.Item
            label="Source Type"
            name="sourceType"
            rules={[
              {
                required: true,
                message: 'Please select a Source Type.',
              },
            ]}
          >
            <Select
              placeholder="Select Source Type"
              options={sourceTypeOptions.map((type) => ({
                label: type,
                value: type,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Author / Organization"
            name="author"
            rules={[
              {
                required: true,
                message: 'Please enter the author or organization.',
              },
            ]}
          >
            <Input placeholder="Enter author or organization" />
          </Form.Item>

          <Form.Item
            label="Publication Year"
            name="publicationYear"
            rules={[
              {
                required: true,
                message: 'Please enter the publication year.',
              },
            ]}
          >
            <Input type="number" placeholder="e.g. 2025" />
          </Form.Item>

          <Form.Item label="DOI" name="doi">
            <Input placeholder="e.g. 10.1016/j..." />
          </Form.Item>

          <Form.Item label="URL" name="url">
            <Input placeholder="https://example.com" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea
              rows={3}
              placeholder="Additional information about this source..."
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Source Details"
        open={viewOpen}
        onCancel={() => setViewOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedSource && (
          <Descriptions bordered column={1} style={{ marginTop: 16 }}>
            <Descriptions.Item label="Source Name">
              {selectedSource.name}
            </Descriptions.Item>

            <Descriptions.Item label="Source Type">
              {selectedSource.sourceType}
            </Descriptions.Item>

            <Descriptions.Item label="Author / Organization">
              {selectedSource.author}
            </Descriptions.Item>

            <Descriptions.Item label="Publication Year">
              {selectedSource.publicationYear}
            </Descriptions.Item>

            <Descriptions.Item label="DOI">
              {selectedSource.doi || '-'}
            </Descriptions.Item>

            <Descriptions.Item label="URL">
              {selectedSource.url || '-'}
            </Descriptions.Item>

            <Descriptions.Item label="Description">
              {selectedSource.description || '-'}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </PageContainer>
  );
};

export default SourcesPage;
