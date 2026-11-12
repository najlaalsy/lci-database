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
  Checkbox,
  Col,
  Descriptions,
  Empty,
  Form,
  Input,
  InputNumber,
  Modal,
  message,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';
import { useSupportingData } from '@/contexts/SupportingDataContext';
import type { Unit, UnitGroup } from '@/data/unitGroups';

const { Text } = Typography;

const UnitGroupsPage: React.FC = () => {
  const { unitGroups, addUnitGroup, updateUnitGroup, deleteUnitGroup } =
    useSupportingData();

  const [searchText, setSearchText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<UnitGroup | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<UnitGroup | null>(null);

  const [form] = Form.useForm();

  const filteredGroups = useMemo(
    () =>
      unitGroups.filter((group) =>
        group.name.toLowerCase().includes(searchText.toLowerCase()),
      ),
    [unitGroups, searchText],
  );

  const handleAdd = () => {
    setEditingGroup(null);
    form.resetFields();
    form.setFieldsValue({
      units: [
        {
          name: '',
          symbol: '',
          conversionFactor: 1,
          isReferenceUnit: true,
        },
      ],
    });
    setModalOpen(true);
  };

  const handleEdit = (group: UnitGroup) => {
    setEditingGroup(group);
    form.setFieldsValue({
      name: group.name,
      description: group.description,
      referenceUnit: group.referenceUnit,
      units: group.units,
    });
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const deleted = deleteUnitGroup(id);

    if (!deleted) {
      message.error(
        'This Unit Group cannot be deleted because it is being used by a Flow Property.',
      );
      return;
    }

    message.success('Unit Group deleted successfully.');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const units: Unit[] = values.units.map((unit: Unit) => ({
        ...unit,
        isReferenceUnit: Boolean(unit.isReferenceUnit),
      }));

      const referenceUnits = units.filter((unit) => unit.isReferenceUnit);

      if (referenceUnits.length !== 1) {
        message.error('Please select exactly one reference unit.');
        return;
      }

      const referenceUnit = referenceUnits[0];

      if (referenceUnit.conversionFactor !== 1) {
        message.error('Reference unit conversion factor must be 1.');
        return;
      }
      if (editingGroup) {
        const updatedGroup: UnitGroup = {
          ...editingGroup,
          name: values.name,
          description: values.description || '',
          referenceUnit: referenceUnit.symbol,
          units,
        };

        updateUnitGroup(updatedGroup);
        message.success('Unit Group updated successfully.');
      } else {
        const newGroup: UnitGroup = {
          id: Math.max(0, ...unitGroups.map((group) => group.id)) + 1,
          name: values.name,
          description: values.description || '',
          referenceUnit: referenceUnit.symbol,
          units,
        };

        addUnitGroup(newGroup);
        message.success('Unit Group added successfully.');
      }

      setModalOpen(false);
      form.resetFields();
    } catch {
      // Form validation errors are displayed by Ant Design.
    }
  };

  const columns: ColumnsType<UnitGroup> = [
    {
      title: 'Unit Group',
      dataIndex: 'name',
      key: 'name',
      render: (value: string) => <Text strong>{value}</Text>,
    },
    {
      title: 'Reference Unit',
      dataIndex: 'referenceUnit',
      key: 'referenceUnit',
      render: (value: string) => <Tag color="blue">{value}</Tag>,
    },
    {
      title: 'Total Units',
      key: 'totalUnits',
      align: 'center',
      render: (_, record) => record.units.length,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            title="View"
            onClick={() => {
              setSelectedGroup(record);
              setViewOpen(true);
            }}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            title="Edit"
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Delete this Unit Group?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              title="Delete"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="Unit Groups"
      subTitle="Manage measurement units and their conversion factors."
    >
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Card>
            <Text type="secondary">Total Unit Groups</Text>
            <Typography.Title level={3}>{unitGroups.length}</Typography.Title>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Text type="secondary">Total Units</Text>
            <Typography.Title level={3}>
              {unitGroups.reduce(
                (total, group) => total + group.units.length,
                0,
              )}
            </Typography.Title>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Text type="secondary">Reference Units</Text>
            <Typography.Title level={3}>{unitGroups.length}</Typography.Title>
          </Card>
        </Col>
      </Row>

      <Card>
        <Row
          justify="space-between"
          align="middle"
          gutter={[16, 16]}
          style={{ marginBottom: 20 }}
        >
          <Col xs={24} md={12}>
            <Input
              placeholder="Search unit groups..."
              prefix={<SearchOutlined />}
              allowClear
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              Add Unit Group
            </Button>
          </Col>
        </Row>

        <Table<UnitGroup>
          rowKey="id"
          columns={columns}
          dataSource={filteredGroups}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          locale={{
            emptyText: <Empty description="No Unit Groups found." />,
          }}
        />
      </Card>

      <Modal
        title={editingGroup ? 'Edit Unit Group' : 'Add Unit Group'}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        onOk={handleSubmit}
        width={750}
        okText={editingGroup ? 'Save Changes' : 'Create'}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            units: [
              {
                name: '',
                symbol: '',
                conversionFactor: 1,
                isReferenceUnit: true,
              },
            ],
          }}
        >
          <Form.Item
            name="name"
            label="Unit Group Name"
            rules={[{ required: true, message: 'Please enter a name.' }]}
          >
            <Input placeholder="e.g. Units of mass" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} placeholder="Describe this unit group" />
          </Form.Item>

          <Form.List
            name="units"
            rules={[
              {
                validator: async (_, units) => {
                  if (!units || units.length === 0) {
                    return Promise.reject(
                      new Error('At least one unit is required.'),
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <>
                <Row
                  justify="space-between"
                  align="middle"
                  style={{ marginBottom: 12 }}
                >
                  <Text strong>Measurement Units</Text>
                  <Button
                    type="dashed"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() =>
                      add({
                        name: '',
                        symbol: '',
                        conversionFactor: 1,
                        isReferenceUnit: false,
                      })
                    }
                  >
                    Add Unit
                  </Button>
                </Row>

                {fields.map((field, index) => (
                  <Card
                    key={field.key}
                    size="small"
                    style={{ marginBottom: 12 }}
                  >
                    <Row gutter={12} align="middle">
                      <Col xs={24} md={7}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'name']}
                          label="Unit Name"
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <Input placeholder="Kilogram" />
                        </Form.Item>
                      </Col>

                      <Col xs={12} md={4}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'symbol']}
                          label="Symbol"
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <Input placeholder="kg" />
                        </Form.Item>
                      </Col>

                      <Col xs={12} md={7}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'conversionFactor']}
                          label="Factor to Reference Unit"
                          rules={[
                            {
                              required: true,
                              message: 'Required',
                            },
                          ]}
                        >
                          <InputNumber
                            min={0.000000001}
                            style={{ width: '100%' }}
                            precision={9}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={18} md={4}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'isReferenceUnit']}
                          label="Reference"
                          valuePropName="checked"
                        >
                          <Checkbox
                            onChange={(event) => {
                              const currentUnits: Unit[] =
                                form.getFieldValue('units') || [];

                              form.setFieldsValue({
                                units: currentUnits.map((unit, index) => ({
                                  ...unit,
                                  isReferenceUnit:
                                    index === field.name
                                      ? event.target.checked
                                      : false,
                                  conversionFactor:
                                    index === field.name && event.target.checked
                                      ? 1
                                      : unit.conversionFactor,
                                })),
                              });
                            }}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={6} md={2}>
                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                          disabled={fields.length === 1}
                          onClick={() => remove(field.name)}
                        />
                      </Col>
                    </Row>
                  </Card>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>

      <Modal
        title="Unit Group Details"
        open={viewOpen}
        onCancel={() => setViewOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewOpen(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedGroup && (
          <>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Unit Group">
                {selectedGroup.name}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {selectedGroup.description || 'Not specified'}
              </Descriptions.Item>
              <Descriptions.Item label="Reference Unit">
                <Tag color="blue">{selectedGroup.referenceUnit}</Tag>
              </Descriptions.Item>
            </Descriptions>

            <Typography.Title level={5} style={{ marginTop: 24 }}>
              Measurement Units
            </Typography.Title>

            <Table<Unit>
              rowKey="symbol"
              size="small"
              pagination={false}
              dataSource={selectedGroup.units}
              columns={[
                {
                  title: 'Unit Name',
                  dataIndex: 'name',
                },
                {
                  title: 'Symbol',
                  dataIndex: 'symbol',
                },
                {
                  title: 'Conversion Factor',
                  dataIndex: 'conversionFactor',
                },
                {
                  title: 'Type',
                  render: (_, unit) =>
                    unit.isReferenceUnit ? (
                      <Tag color="success">Reference</Tag>
                    ) : (
                      <Tag>Standard</Tag>
                    ),
                },
              ]}
            />
          </>
        )}
      </Modal>
    </PageContainer>
  );
};
export default UnitGroupsPage;
