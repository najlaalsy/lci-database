import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history, useLocation } from '@umijs/max';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
} from 'antd';
import { useDatasets } from '@/contexts/DatasetContext';
import type { Dataset } from '@/data/datasets';

const { TextArea } = Input;
const { Text } = Typography;

const ManualInputPage: React.FC = () => {
  const [form] = Form.useForm();
  const { addDataset, datasets } = useDatasets();
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const classCode = queryParams.get('classCode') || '';

  const handleSaveDraft = (values: any) => {
    const newId = Math.max(0, ...datasets.map((dataset) => dataset.id)) + 1;

    const newDataset: Dataset = {
      id: newId,
      name: values.baseName,
      location: values.location || 'Not specified',
      reference: values.sourceReference || 'Not provided',
      type: 'Unit process',
      updatedAt: new Date().toISOString().slice(0, 10),
      classCode,
      status: 'Draft',

      details: {
        processInformation: {
          baseName: values.baseName,
          treatment: values.treatment,
          mixLocationTypes: values.mixLocationTypes,
          quantitativeProperties: values.quantitativeProperties,
          identifier: values.identifier,
          synonyms: values.synonyms,
          classificationSystem: values.classificationSystem,
          classification: values.classification,
          classificationUri: values.classificationUri,
          description: values.description,
        },

        timeLocation: {
          referenceYear: values.referenceYear,
          validUntil: values.validUntil,
          timeDescription: values.timeDescription,
          location: values.location || 'Not specified',
          subLocations: values.subLocations,
          geographicalDescription: values.geographicalDescription,
        },

        technology: {
          technologyDescription: values.technologyDescription,
          technicalPurpose: values.technicalPurpose,
        },

        inputs: values.inputs || [],
        outputs: values.outputs || [],

        dataQuality: {
          dataSource: values.dataSource,
          sourceReference: values.sourceReference,
          dataCollectionMethod: values.dataCollectionMethod,
          dataQualityDescription: values.dataQualityDescription,
          dataCompleteness: values.dataCompleteness,
          dataLimitations: values.dataLimitations,
        },
      },
    };

    addDataset(newDataset);

    history.push(`/datasets/new/detail/${newId}`);
  };

  const tabItems = [
    {
      key: 'process',
      label: 'Process Information',
      children: (
        <>
          <Card title="Name" style={{ marginBottom: 16 }}>
            <Form.Item
              label="Base Name"
              name="baseName"
              rules={[
                { required: true, message: 'Please enter the process name.' },
              ]}
            >
              <Input placeholder="Enter process name" />
            </Form.Item>

            <Form.Item label="Treatment, Standards, Routes" name="treatment">
              <Input placeholder="Enter treatment, standards, or routes" />
            </Form.Item>

            <Form.Item label="Mix and Location Types" name="mixLocationTypes">
              <Input placeholder="Enter mix and location types" />
            </Form.Item>

            <Form.Item
              label="Quantitative Product or Process Properties"
              name="quantitativeProperties"
            >
              <TextArea
                rows={3}
                placeholder="Describe quantitative product or process properties"
              />
            </Form.Item>

            <Form.Item label="Identifier of Sub-dataset" name="identifier">
              <Input placeholder="Enter sub-dataset identifier" />
            </Form.Item>

            <Form.Item label="Synonyms" name="synonyms">
              <Select
                mode="tags"
                placeholder="Enter synonyms and press Enter"
                tokenSeparators={[',']}
              />
            </Form.Item>
          </Card>

          <Card title="Classification" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Classification System"
                  name="classificationSystem"
                >
                  <Input disabled />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Classification" name="classification">
                  <Input placeholder="Enter ISIC class code" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Classification System URI"
              name="classificationUri"
            >
              <Input placeholder="Enter classification system URL (optional)" />
            </Form.Item>
          </Card>

          <Card title="Process Description">
            <Form.Item label="Description" name="description">
              <TextArea
                rows={4}
                placeholder="Provide a description of the process"
              />
            </Form.Item>
          </Card>
        </>
      ),
    },
    {
      key: 'time-location',
      label: 'Time & Location',
      children: (
        <>
          <Card title="Time Representativeness" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Reference Year"
                  name="referenceYear"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the reference year.',
                    },
                  ]}
                >
                  <InputNumber
                    min={1900}
                    max={2100}
                    style={{ width: '100%' }}
                    placeholder="e.g. 2025"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Dataset Valid Until" name="validUntil">
                  <InputNumber
                    min={1900}
                    max={2100}
                    style={{ width: '100%' }}
                    placeholder="e.g. 2030"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Time Representativeness Description"
              name="timeDescription"
            >
              <Input.TextArea
                rows={3}
                placeholder="Describe the time period represented by this dataset"
              />
            </Form.Item>
          </Card>

          <Card
            title="Geographical Representativeness"
            style={{ marginBottom: 16 }}
          >
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: 'Please select a location.' }]}
            >
              <Select
                showSearch
                placeholder="Select a country or geographical region"
                options={[
                  { label: 'Indonesia', value: 'Indonesia' },
                  { label: 'Global', value: 'Global' },
                ]}
              />
            </Form.Item>
            <Form.Item label="Sub-location(s)" name="subLocations">
              <Select
                mode="multiple"
                showSearch
                allowClear
                placeholder="Select province(s)"
                optionFilterProp="label"
                options={[
                  { label: 'Aceh', value: 'Aceh' },
                  { label: 'Bali', value: 'Bali' },
                  { label: 'Banten', value: 'Banten' },
                  { label: 'Bengkulu', value: 'Bengkulu' },
                  { label: 'DI Yogyakarta', value: 'DI Yogyakarta' },
                  { label: 'DKI Jakarta', value: 'DKI Jakarta' },
                  { label: 'Gorontalo', value: 'Gorontalo' },
                  { label: 'Jambi', value: 'Jambi' },
                  { label: 'Jawa Barat', value: 'Jawa Barat' },
                  { label: 'Jawa Tengah', value: 'Jawa Tengah' },
                  { label: 'Jawa Timur', value: 'Jawa Timur' },
                  { label: 'Kalimantan Barat', value: 'Kalimantan Barat' },
                  { label: 'Kalimantan Selatan', value: 'Kalimantan Selatan' },
                  { label: 'Kalimantan Tengah', value: 'Kalimantan Tengah' },
                  { label: 'Kalimantan Timur', value: 'Kalimantan Timur' },
                  { label: 'Kalimantan Utara', value: 'Kalimantan Utara' },
                  {
                    label: 'Kepulauan Bangka Belitung',
                    value: 'Kepulauan Bangka Belitung',
                  },
                  { label: 'Kepulauan Riau', value: 'Kepulauan Riau' },
                  { label: 'Lampung', value: 'Lampung' },
                  { label: 'Maluku', value: 'Maluku' },
                  { label: 'Maluku Utara', value: 'Maluku Utara' },
                  {
                    label: 'Nusa Tenggara Barat',
                    value: 'Nusa Tenggara Barat',
                  },
                  {
                    label: 'Nusa Tenggara Timur',
                    value: 'Nusa Tenggara Timur',
                  },
                  { label: 'Papua', value: 'Papua' },
                  { label: 'Papua Barat', value: 'Papua Barat' },
                  { label: 'Papua Barat Daya', value: 'Papua Barat Daya' },
                  { label: 'Papua Pegunungan', value: 'Papua Pegunungan' },
                  { label: 'Papua Selatan', value: 'Papua Selatan' },
                  { label: 'Papua Tengah', value: 'Papua Tengah' },
                  { label: 'Riau', value: 'Riau' },
                  { label: 'Sulawesi Barat', value: 'Sulawesi Barat' },
                  { label: 'Sulawesi Selatan', value: 'Sulawesi Selatan' },
                  { label: 'Sulawesi Tengah', value: 'Sulawesi Tengah' },
                  { label: 'Sulawesi Tenggara', value: 'Sulawesi Tenggara' },
                  { label: 'Sulawesi Utara', value: 'Sulawesi Utara' },
                  { label: 'Sumatera Barat', value: 'Sumatera Barat' },
                  { label: 'Sumatera Selatan', value: 'Sumatera Selatan' },
                  { label: 'Sumatera Utara', value: 'Sumatera Utara' },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Geographical Representativeness Description"
              name="geographicalDescription"
            >
              <Input.TextArea
                rows={3}
                placeholder="Describe the geographical area represented by this dataset"
              />
            </Form.Item>
          </Card>
        </>
      ),
    },
    {
      key: 'technology',
      label: 'Technology',
      children: (
        <>
          <Card
            title="Technological Representativeness"
            style={{ marginBottom: 16 }}
          >
            <Form.Item
              label="Technology Description"
              name="technologyDescription"
              extra="Describe the technology, equipment, methods, or production techniques used in the process."
            >
              <Input.TextArea
                rows={5}
                placeholder="Describe the technology used in this process..."
              />
            </Form.Item>
          </Card>

          <Card title="Technical Purpose">
            <Form.Item
              label="Technical Purpose of Product or Process"
              name="technicalPurpose"
              extra="Explain the technical function or intended purpose of the product or process."
            >
              <Input.TextArea
                rows={4}
                placeholder="Describe the technical purpose of this product or process..."
              />
            </Form.Item>
          </Card>
        </>
      ),
    },

    {
      key: 'exchanges',
      label: 'Inputs & Outputs',
      children: (
        <>
          <Card
            title="Input Exchanges"
            extra={
              <Text type="secondary">
                Materials and resources entering the process
              </Text>
            }
            style={{ marginBottom: 16 }}
          >
            <Form.List name="inputs">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Card
                      key={key}
                      size="small"
                      title={`Input ${index + 1}`}
                      style={{ marginBottom: 12 }}
                      extra={
                        <Button
                          danger
                          type="text"
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        >
                          Remove
                        </Button>
                      }
                    >
                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            {...restField}
                            label="Flow Name"
                            name={[name, 'flowName']}
                            rules={[
                              { required: true, message: 'Enter flow name.' },
                            ]}
                          >
                            <Input placeholder="e.g. Fresh water" />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                          <Form.Item
                            {...restField}
                            label="Flow Category"
                            name={[name, 'flowCategory']}
                            rules={[
                              {
                                required: true,
                                message: 'Select flow category.',
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select category"
                              options={[
                                { label: 'Material', value: 'Material' },
                                { label: 'Energy', value: 'Energy' },
                                { label: 'Water', value: 'Water' },
                                {
                                  label: 'Other Resource',
                                  value: 'Other Resource',
                                },
                              ]}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                          <Form.Item
                            {...restField}
                            label="Amount"
                            name={[name, 'amount']}
                            rules={[
                              { required: true, message: 'Enter amount.' },
                            ]}
                          >
                            <InputNumber
                              min={0}
                              style={{ width: '100%' }}
                              placeholder="Enter amount"
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                          <Form.Item
                            {...restField}
                            label="Unit"
                            name={[name, 'unit']}
                            rules={[{ required: true, message: 'Enter unit.' }]}
                          >
                            <Input placeholder="e.g. kg, m3, kWh" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        {...restField}
                        label="Description"
                        name={[name, 'description']}
                        style={{ marginBottom: 0 }}
                      >
                        <Input.TextArea
                          rows={2}
                          placeholder="Additional information (optional)"
                        />
                      </Form.Item>
                    </Card>
                  ))}

                  <Button
                    type="dashed"
                    block
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                  >
                    Add Input Flow
                  </Button>
                </>
              )}
            </Form.List>
          </Card>

          <Card
            title="Output Exchanges"
            extra={
              <Text type="secondary">
                Products, emissions, and waste leaving the process
              </Text>
            }
          >
            <Form.List name="outputs">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Card
                      key={key}
                      size="small"
                      title={`Output ${index + 1}`}
                      style={{ marginBottom: 12 }}
                      extra={
                        <Button
                          danger
                          type="text"
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        >
                          Remove
                        </Button>
                      }
                    >
                      <Row gutter={16}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            {...restField}
                            label="Flow Name"
                            name={[name, 'flowName']}
                            rules={[
                              { required: true, message: 'Enter flow name.' },
                            ]}
                          >
                            <Input placeholder="e.g. Rice grain" />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                          <Form.Item
                            {...restField}
                            label="Flow Category"
                            name={[name, 'flowCategory']}
                            rules={[
                              {
                                required: true,
                                message: 'Select flow category.',
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select category"
                              options={[
                                { label: 'Product', value: 'Product' },
                                { label: 'Co-product', value: 'Co-product' },
                                {
                                  label: 'Emission to Air',
                                  value: 'Emission to Air',
                                },
                                {
                                  label: 'Emission to Water',
                                  value: 'Emission to Water',
                                },
                                {
                                  label: 'Emission to Soil',
                                  value: 'Emission to Soil',
                                },
                                { label: 'Waste', value: 'Waste' },
                                {
                                  label: 'Other Output',
                                  value: 'Other Output',
                                },
                              ]}
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                          <Form.Item
                            {...restField}
                            label="Amount"
                            name={[name, 'amount']}
                            rules={[
                              { required: true, message: 'Enter amount.' },
                            ]}
                          >
                            <InputNumber
                              min={0}
                              style={{ width: '100%' }}
                              placeholder="Enter amount"
                            />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                          <Form.Item
                            {...restField}
                            label="Unit"
                            name={[name, 'unit']}
                            rules={[{ required: true, message: 'Enter unit.' }]}
                          >
                            <Input placeholder="e.g. kg, m3, kWh" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        {...restField}
                        label="Description"
                        name={[name, 'description']}
                        style={{ marginBottom: 0 }}
                      >
                        <Input.TextArea
                          rows={2}
                          placeholder="Additional information (optional)"
                        />
                      </Form.Item>
                    </Card>
                  ))}

                  <Button
                    type="dashed"
                    block
                    icon={<PlusOutlined />}
                    onClick={() => add()}
                  >
                    Add Output Flow
                  </Button>
                </>
              )}
            </Form.List>
          </Card>
        </>
      ),
    },

    {
      key: 'quality',
      label: 'Data Quality',
      children: (
        <>
          <Card title="Data Sources" style={{ marginBottom: 16 }}>
            <Form.Item
              label="Data Source"
              name="dataSource"
              rules={[
                { required: true, message: 'Please enter the data source.' },
              ]}
            >
              <Input placeholder="e.g. Industry report, research paper, survey" />
            </Form.Item>

            <Form.Item label="Source Reference" name="sourceReference">
              <Input.TextArea
                rows={3}
                placeholder="Enter publication title, author, URL, or document reference"
              />
            </Form.Item>

            <Form.Item
              label="Data Collection Method"
              name="dataCollectionMethod"
            >
              <Select
                placeholder="Select data collection method"
                options={[
                  { label: 'Direct Measurement', value: 'Direct Measurement' },
                  { label: 'Survey', value: 'Survey' },
                  { label: 'Literature Review', value: 'Literature Review' },
                  { label: 'Statistical Data', value: 'Statistical Data' },
                  { label: 'Expert Judgment', value: 'Expert Judgment' },
                  { label: 'Other', value: 'Other' },
                ]}
              />
            </Form.Item>
          </Card>

          <Card title="Data Quality Description" style={{ marginBottom: 16 }}>
            <Form.Item
              label="Data Quality Description"
              name="dataQualityDescription"
            >
              <Input.TextArea
                rows={4}
                placeholder="Describe the reliability and quality of the collected data"
              />
            </Form.Item>

            <Form.Item label="Data Completeness" name="dataCompleteness">
              <Select
                placeholder="Select data completeness"
                options={[
                  { label: 'Complete', value: 'Complete' },
                  { label: 'Partially Complete', value: 'Partially Complete' },
                  { label: 'Limited', value: 'Limited' },
                  { label: 'Unknown', value: 'Unknown' },
                ]}
              />
            </Form.Item>
          </Card>

          <Card title="Data Limitations">
            <Form.Item label="Data Limitations" name="dataLimitations">
              <Input.TextArea
                rows={4}
                placeholder="Describe limitations, assumptions, or missing information"
              />
            </Form.Item>
          </Card>
        </>
      ),
    },
  ];
  return (
    <PageContainer
      title="Create LCI Dataset"
      subTitle="Enter process information to create a new LCI dataset."
      breadcrumb={{
        items: [
          { title: 'Processes' },
          { title: 'Dataset List' },
          { title: 'Add Dataset' },
          { title: 'Manual Input' },
        ],
      }}
    >
      <Card>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            classificationSystem: 'ISIC Rev. 5',
          }}
          onFinish={handleSaveDraft}
        >
          <Tabs defaultActiveKey="process" items={tabItems} tabPosition="top" />

          <Row justify="end" style={{ marginTop: 24 }}>
            <Space>
              <Button onClick={() => form.resetFields()}>Reset</Button>
              <Button type="primary" htmlType="submit">
                Save Draft
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};
export default ManualInputPage;
