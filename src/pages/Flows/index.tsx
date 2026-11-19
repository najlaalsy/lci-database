import {
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';
import { useSupportingData } from '@/contexts/SupportingDataContext';
import type { Flow, FlowType } from '@/data/flows';

const flowTypeLabels: Record<FlowType, string> = {
  PRODUCT_FLOW: 'Product Flow',
  WASTE_FLOW: 'Waste Flow',
  ELEMENTARY_FLOW: 'Elementary Flow',
};

const flowTypeColors: Record<FlowType, string> = {
  PRODUCT_FLOW: 'blue',
  WASTE_FLOW: 'orange',
  ELEMENTARY_FLOW: 'green',
};

const Flows: React.FC = () => {
  const { flows, flowProperties, unitGroups, addFlow, updateFlow, deleteFlow } =
    useSupportingData();

  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState<FlowType | 'ALL'>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'view' | 'edit'>('add');
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null);

  const [form] = Form.useForm();

  const filteredFlows = useMemo(() => {
    return flows.filter((flow) => {
      const matchesSearch =
        flow.name.toLowerCase().includes(searchText.toLowerCase()) ||
        flow.description.toLowerCase().includes(searchText.toLowerCase());

      const matchesType =
        selectedType === 'ALL' || flow.flowType === selectedType;

      return matchesSearch && matchesType;
    });
  }, [flows, searchText, selectedType]);

  const openFlowModal = (mode: 'add' | 'view' | 'edit', flow?: Flow) => {
    setModalMode(mode);
    setSelectedFlow(flow || null);

    if (flow) {
      form.setFieldsValue({
        name: flow.name,
        flowType: flow.flowType,
        description: flow.description,
        casNumber: flow.casNumber,
        chemicalFormula: flow.chemicalFormula,
        synonyms: flow.synonyms.join(', '),
        classificationSystem: flow.classificationSystem,
        classification: flow.classification,
        location: flow.location,
        flowProperties: flow.flowPropertyFactors.map((factor) => ({
          flowPropertyId: factor.flowPropertyId,
          conversionFactor: factor.conversionFactor,
        })),
        referenceFlowPropertyId: flow.flowPropertyFactors.find(
          (factor) => factor.isReferenceProperty,
        )?.flowPropertyId,
      });
    } else {
      form.resetFields();
    }

    setIsModalOpen(true);
  };

  const handleSaveFlow = async () => {
    try {
      const values = await form.validateFields();
      const selectedProperties = values.flowProperties;

      const flow: Flow = {
        id:
          modalMode === 'edit' && selectedFlow
            ? selectedFlow.id
            : flows.length > 0
              ? Math.max(...flows.map((item) => item.id)) + 1
              : 1,
        name: values.name,
        flowType: values.flowType,
        description: values.description || '',
        casNumber: values.casNumber || undefined,
        chemicalFormula: values.chemicalFormula || undefined,
        synonyms: values.synonyms
          ? values.synonyms
              .split(',')
              .map((item: string) => item.trim())
              .filter(Boolean)
          : [],
        classificationSystem: values.classificationSystem || undefined,
        classification: values.classification || undefined,
        location: values.location,
        flowPropertyFactors: selectedProperties.map((item: any) => ({
          flowPropertyId: item.flowPropertyId,
          conversionFactor:
            item.flowPropertyId === values.referenceFlowPropertyId
              ? 1
              : item.conversionFactor,
          isReferenceProperty:
            item.flowPropertyId === values.referenceFlowPropertyId,
        })),
      };

      const saved = modalMode === 'edit' ? updateFlow(flow) : addFlow(flow);

      if (!saved) {
        message.error('Invalid Flow Property configuration.');
        return;
      }

      message.success(
        modalMode === 'edit'
          ? 'Flow updated successfully.'
          : 'Flow added successfully.',
      );

      form.resetFields();
      setSelectedFlow(null);
      setIsModalOpen(false);
    } catch {
      // Form validation errors are handled by Ant Design.
    }
  };

  const columns: ColumnsType<Flow> = [
    {
      title: 'Flow Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record) => (
        <Space direction="vertical" size={0}>
          <strong>{name}</strong>
          <span style={{ color: '#8c8c8c', fontSize: 12 }}>
            {record.description}
          </span>
        </Space>
      ),
    },
    {
      title: 'Flow Type',
      dataIndex: 'flowType',
      key: 'flowType',
      render: (type: FlowType) => (
        <Tag color={flowTypeColors[type]}>{flowTypeLabels[type]}</Tag>
      ),
    },
    {
      title: 'Reference Property',
      key: 'referenceProperty',
      render: (_, record) => {
        const referenceFactor = record.flowPropertyFactors.find(
          (factor) => factor.isReferenceProperty,
        );

        const property = flowProperties.find(
          (item) => item.id === referenceFactor?.flowPropertyId,
        );

        const unitGroup = unitGroups.find(
          (item) => item.id === property?.unitGroupId,
        );

        return property
          ? `${property.name} (${unitGroup?.referenceUnit ?? 'Unknown'})`
          : 'Not available';
      },
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openFlowModal('view', record)}>
            View
          </Button>

          <Button type="link" onClick={() => openFlowModal('edit', record)}>
            Edit
          </Button>

          <Popconfirm
            title="Delete Flow"
            description={`Are you sure you want to delete "${record.name}"?`}
            onConfirm={() => {
              deleteFlow(record.id);
              message.success('Flow deleted successfully.');
            }}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title="Flows" content="Manage and explore LCI flow records.">
      <Space
        style={{
          width: '100%',
          marginBottom: 16,
          justifyContent: 'space-between',
        }}
        wrap
      >
        <Space wrap>
          <Input
            placeholder="Search flow name or description"
            prefix={<SearchOutlined />}
            allowClear
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            style={{ width: 280 }}
          />

          <Select
            value={selectedType}
            onChange={setSelectedType}
            style={{ width: 180 }}
            options={[
              { label: 'All Flow Types', value: 'ALL' },
              { label: 'Product Flow', value: 'PRODUCT_FLOW' },
              { label: 'Waste Flow', value: 'WASTE_FLOW' },
              { label: 'Elementary Flow', value: 'ELEMENTARY_FLOW' },
            ]}
          />
        </Space>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setIsModalOpen(true);
          }}
        >
          Add Flow
        </Button>
      </Space>

      <Table<Flow>
        rowKey="id"
        columns={columns}
        dataSource={filteredFlows}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} flows`,
        }}
        scroll={{ x: 900 }}
      />

      <Modal
        title="Add New Flow"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        onOk={modalMode === 'view' ? undefined : handleSaveFlow}
        okText="Save Flow"
        cancelText="Cancel"
        width={750}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          preserve={false}
          disabled={modalMode === 'view'}
        >
          <Typography.Title level={5}>General Information</Typography.Title>

          <Form.Item
            name="name"
            label="Flow Name"
            rules={[{ required: true, message: 'Please enter Flow Name.' }]}
          >
            <Input placeholder="Enter Flow Name" />
          </Form.Item>

          <Form.Item
            name="flowType"
            label="Flow Type"
            rules={[{ required: true, message: 'Please select Flow Type.' }]}
          >
            <Select
              placeholder="Select Flow Type"
              options={[
                { label: 'Product Flow', value: 'PRODUCT_FLOW' },
                { label: 'Waste Flow', value: 'WASTE_FLOW' },
                { label: 'Elementary Flow', value: 'ELEMENTARY_FLOW' },
              ]}
            />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <Typography.Title level={5}>Chemical Identifiers</Typography.Title>

          <Space style={{ display: 'flex' }} align="start">
            <Form.Item name="casNumber" label="CAS Number">
              <Input placeholder="e.g. 124-38-9" />
            </Form.Item>

            <Form.Item name="chemicalFormula" label="Chemical Formula">
              <Input placeholder="e.g. CO2" />
            </Form.Item>
          </Space>

          <Form.Item name="synonyms" label="Synonyms">
            <Input placeholder="Separate synonyms with commas" />
          </Form.Item>

          <Typography.Title level={5}>Flow Properties</Typography.Title>

          <Form.List
            name="flowProperties"
            rules={[
              {
                validator: async (_, value) => {
                  if (!value || value.length === 0) {
                    throw new Error('Add at least one Flow Property.');
                  }

                  const ids = value.map(
                    (item: { flowPropertyId: number }) => item.flowPropertyId,
                  );

                  if (ids.some((id: number) => id === undefined)) {
                    throw new Error('Please select all Flow Properties.');
                  }

                  if (new Set(ids).size !== ids.length) {
                    throw new Error('Flow Properties cannot be duplicated.');
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    align="start"
                    style={{ display: 'flex', marginBottom: 8 }}
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, 'flowPropertyId']}
                      label="Flow Property"
                      rules={[
                        { required: true, message: 'Select a property.' },
                      ]}
                    >
                      <Select
                        placeholder="Select Flow Property"
                        style={{ width: 250 }}
                        options={flowProperties.map((property) => {
                          const group = unitGroups.find(
                            (item) => item.id === property.unitGroupId,
                          );

                          return {
                            label: `${property.name} (${group?.referenceUnit ?? 'Unknown'})`,
                            value: property.id,
                          };
                        })}
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      name={[field.name, 'conversionFactor']}
                      label="Conversion Factor"
                      initialValue={1}
                      rules={[
                        { required: true, message: 'Enter conversion factor.' },
                        {
                          type: 'number',
                          min: 0.000001,
                          message: 'Factor must be greater than zero.',
                        },
                      ]}
                    >
                      <InputNumber min={0.000001} style={{ width: 150 }} />
                    </Form.Item>

                    <Button
                      danger
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => remove(field.name)}
                      style={{ marginTop: 30 }}
                    />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    block
                    icon={<PlusOutlined />}
                    onClick={() => add({ conversionFactor: 1 })}
                  >
                    Add Flow Property
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            name="referenceFlowPropertyId"
            label="Reference Property"
            rules={[
              { required: true, message: 'Select Reference Property.' },
              {
                validator: async (_, value) => {
                  const properties = form.getFieldValue('flowProperties') || [];

                  const exists = properties.some(
                    (item: { flowPropertyId: number }) =>
                      item.flowPropertyId === value,
                  );

                  if (!exists) {
                    throw new Error(
                      'Reference Property must be selected in Flow Properties.',
                    );
                  }
                },
              },
            ]}
          >
            <Select
              placeholder="Select Reference Property"
              options={flowProperties.map((property) => ({
                label: property.name,
                value: property.id,
              }))}
            />
          </Form.Item>

          <Typography.Title level={5}>
            Classification and Location
          </Typography.Title>

          <Form.Item name="classificationSystem" label="Classification System">
            <Input placeholder="e.g. ISIC Rev.5" />
          </Form.Item>

          <Form.Item name="classification" label="Classification">
            <Input placeholder="Enter classification code or category" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter location.' }]}
          >
            <Select
              placeholder="Select Location"
              options={[
                { label: 'Global', value: 'Global' },
                { label: 'Indonesia', value: 'Indonesia' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Flows;
