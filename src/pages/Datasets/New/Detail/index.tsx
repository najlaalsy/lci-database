import { PageContainer } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDatasets } from '@/contexts/DatasetContext';
import type { Exchange } from '@/data/datasets';

const { Text, Title } = Typography;

const DetailPage: React.FC = () => {
  const { datasetId } = useParams<{ datasetId: string }>();
  const { getDatasetById } = useDatasets();

  const dataset = getDatasetById(Number(datasetId));

  if (!dataset) {
    return (
      <PageContainer title="Dataset Detail" breadcrumbRender={false}>
        <Empty description="Dataset tidak ditemukan">
          <Button type="primary" onClick={() => history.back()}>
            Back
          </Button>
        </Empty>
      </PageContainer>
    );
  }

  const details = dataset.details;

  const exchangeColumns: ColumnsType<Exchange> = [
    {
      title: 'Flow Name',
      dataIndex: 'flowName',
    },
    {
      title: 'Category',
      dataIndex: 'flowCategory',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (value?: string) => value || '-',
    },
  ];

  return (
    <PageContainer
      title="Dataset Detail"
      breadcrumbRender={false}
      extra={[
        <Button key="back" onClick={() => history.back()}>
          Back to Dataset List
        </Button>,
      ]}
    >
      <Breadcrumb
        items={[
          { title: 'Processes' },
          { title: `Class ${dataset.classCode}` },
          { title: 'Dataset Detail' },
        ]}
        style={{ marginBottom: 20 }}
      />

      <Card style={{ marginBottom: 24 }}>
        <Space direction="vertical" size={8}>
          <Space wrap>
            <Tag color="blue">{dataset.type}</Tag>
            <Tag
              color={
                dataset.status === 'Verified'
                  ? 'success'
                  : dataset.status === 'Rejected'
                    ? 'error'
                    : dataset.status === 'Draft'
                      ? 'default'
                      : 'processing'
              }
            >
              {dataset.status}
            </Tag>
          </Space>

          <Title level={3} style={{ margin: 0 }}>
            {dataset.name}
          </Title>

          <Text type="secondary">
            Dataset ID: {dataset.id} | ISIC Class: {dataset.classCode}
          </Text>
        </Space>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Dataset Overview" style={{ height: '100%' }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Name">{dataset.name}</Descriptions.Item>
              <Descriptions.Item label="Location">
                {dataset.location}
              </Descriptions.Item>
              <Descriptions.Item label="Reference">
                {dataset.reference || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Dataset Type">
                {dataset.type}
              </Descriptions.Item>
              <Descriptions.Item label="Updated At">
                {dataset.updatedAt}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Process Information" style={{ height: '100%' }}>
            {details ? (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Base Name">
                  {details.processInformation.baseName}
                </Descriptions.Item>
                <Descriptions.Item label="Treatment">
                  {details.processInformation.treatment || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Identifier">
                  {details.processInformation.identifier || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Classification">
                  {details.processInformation.classification || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Classification System">
                  {details.processInformation.classificationSystem || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Synonyms">
                  {details.processInformation.synonyms?.join(', ') || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Description">
                  {details.processInformation.description || '-'}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="Detailed information is not available"
              />
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Time & Location">
            {details ? (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Reference Year">
                  {details.timeLocation.referenceYear}
                </Descriptions.Item>
                <Descriptions.Item label="Valid Until">
                  {details.timeLocation.validUntil || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Time Description">
                  {details.timeLocation.timeDescription || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Location">
                  {details.timeLocation.location}
                </Descriptions.Item>
                <Descriptions.Item label="Sub-locations">
                  {details.timeLocation.subLocations?.join(', ') || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Geographical Description">
                  {details.timeLocation.geographicalDescription || '-'}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No time and location data"
              />
            )}
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Technology">
            {details ? (
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Technology Description">
                  {details.technology.technologyDescription || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Technical Purpose">
                  {details.technology.technicalPurpose || '-'}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No technology data"
              />
            )}
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Inputs">
            {details ? (
              <Table<Exchange>
                rowKey={(record, index) => `${record.flowName}-${index}`}
                columns={exchangeColumns}
                dataSource={details.inputs}
                pagination={false}
                scroll={{ x: 700 }}
                locale={{ emptyText: 'No input data' }}
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No input data"
              />
            )}
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Outputs">
            {details ? (
              <Table<Exchange>
                rowKey={(record, index) => `${record.flowName}-${index}`}
                columns={exchangeColumns}
                dataSource={details.outputs}
                pagination={false}
                scroll={{ x: 700 }}
                locale={{ emptyText: 'No output data' }}
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No output data"
              />
            )}
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Data Quality">
            {details ? (
              <Descriptions column={{ xs: 1, md: 2 }} size="small">
                <Descriptions.Item label="Data Source">
                  {details.dataQuality.dataSource}
                </Descriptions.Item>
                <Descriptions.Item label="Source Reference">
                  {details.dataQuality.sourceReference || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Collection Method">
                  {details.dataQuality.dataCollectionMethod || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Data Completeness">
                  {details.dataQuality.dataCompleteness || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Quality Description" span={2}>
                  {details.dataQuality.dataQualityDescription || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Data Limitations" span={2}>
                  {details.dataQuality.dataLimitations || '-'}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No data quality information"
              />
            )}
          </Card>
        </Col>
      </Row>

      {!details && (
        <Alert
          style={{ marginTop: 16 }}
          type="info"
          showIcon
          message="This is a demo dataset"
          description="Detailed information has not been entered for this dataset."
        />
      )}
    </PageContainer>
  );
};

export default DetailPage;
