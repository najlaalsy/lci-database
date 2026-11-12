import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
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
import type { FlowProperty } from '@/data/flowProperties';

const FlowPropertiesPage: React.FC = () => {
  const {
    flowProperties,
    unitGroups,
    addFlowProperty,
    updateFlowProperty,
    deleteFlowProperty,
  } = useSupportingData();

  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<FlowProperty | null>(
    null,
  );
  const [selectedProperty, setSelectedProperty] = useState<FlowProperty | null>(
    null,
  );

  const filteredProperties = flowProperties.filter((property) =>
    property.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleAdd = () => {
    setEditingProperty(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (property: FlowProperty) => {
    setEditingProperty(property);
    form.setFieldsValue(property);
    setModalOpen(true);
  };

  const handleView = (property: FlowProperty) => {
    setSelectedProperty(property);
    setViewOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteFlowProperty(id);
    message.success('Flow Property deleted successfully.');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const duplicate = flowProperties.some(
        (property) =>
          property.name.trim().toLowerCase() ===
            values.name.trim().toLowerCase() &&
          property.id !== editingProperty?.id,
      );

      if (duplicate) {
        message.error('Flow Property name already exists.');
        return;
      }

      const flowProperty: FlowProperty = {
        id: editingProperty
          ? editingProperty.id
          : Math.max(0, ...flowProperties.map((item) => item.id)) + 1,
        name: values.name.trim(),
        description: values.description?.trim() || '',
        unitGroupId: values.unitGroupId,
      };

      if (editingProperty) {
        updateFlowProperty(flowProperty);
        message.success('Flow Property updated successfully.');
      } else {
        addFlowProperty(flowProperty);
        message.success('Flow Property added successfully.');
      }

      setModalOpen(false);
      form.resetFields();
      setEditingProperty(null);
    } catch {
      // Form validation handles invalid fields.
    }
  };

  const columns: ColumnsType<FlowProperty> = [
    {
      title: 'Flow Property',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Typography.Text strong>{name}</Typography.Text>
      ),
    },
    {
      title: 'Unit Group',
      key: 'unitGroup',
      render: (_, record) => {
        const group = unitGroups.find((item) => item.id === record.unitGroupId);
        return group?.name || 'Unknown Unit Group';
      },
    },
    {
      title: 'Reference Unit',
      key: 'referenceUnit',
      render: (_, record) => {
        const group = unitGroups.find((item) => item.id === record.unitGroupId);
        return group?.referenceUnit || '-';
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (description: string) => description || '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 170,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Delete Flow Property"
            description="Are you sure you want to delete this Flow Property?"
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="Flow Properties"
      content="Manage the physical properties used to quantify LCI flows."
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Total Flow Properties"
              value={flowProperties.length}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Available Unit Groups"
              value={unitGroups.length}
            />
          </Card>
        </Col>
      </Row>

      <Card
        style={{ marginTop: 16 }}
        title="Flow Property List"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            Add Flow Property
          </Button>
        }
      >
        <Space
          style={{
            marginBottom: 16,
            width: '100%',
          }}
        >
          <Input
            allowClear
            placeholder="Search Flow Property..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            style={{ width: 280 }}
          />
        </Space>

        <Table<FlowProperty>
          rowKey="id"
          columns={columns}
          dataSource={filteredProperties}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 900 }}
        />
      </Card>

      <Modal
        title={editingProperty ? 'Edit Flow Property' : 'Add Flow Property'}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditingProperty(null);
          form.resetFields();
        }}
        onOk={handleSubmit}
        okText={editingProperty ? 'Save Changes' : 'Add'}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
          <Form.Item
            label="Flow Property Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter the Flow Property name.',
              },
            ]}
          >
            <Input placeholder="e.g. Mass" />
          </Form.Item>

          <Form.Item
            label="Unit Group"
            name="unitGroupId"
            rules={[
              {
                required: true,
                message: 'Please select a Unit Group.',
              },
            ]}
          >
            <Select
              placeholder="Select Unit Group"
              options={unitGroups.map((group) => ({
                label: `${group.name} (${group.referenceUnit})`,
                value: group.id,
              }))}
            />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea
              rows={3}
              placeholder="Describe this Flow Property..."
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Flow Property Details"
        open={viewOpen}
        onCancel={() => setViewOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewOpen(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedProperty && (
          <Descriptions bordered column={1} style={{ marginTop: 16 }}>
            <Descriptions.Item label="Flow Property">
              {selectedProperty.name}
            </Descriptions.Item>
            <Descriptions.Item label="Unit Group">
              {unitGroups.find(
                (group) => group.id === selectedProperty.unitGroupId,
              )?.name || 'Unknown Unit Group'}
            </Descriptions.Item>
            <Descriptions.Item label="Reference Unit">
              {unitGroups.find(
                (group) => group.id === selectedProperty.unitGroupId,
              )?.referenceUnit || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {selectedProperty.description || '-'}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </PageContainer>
  );
};

export default FlowPropertiesPage;
