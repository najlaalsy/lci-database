import { PageContainer } from '@ant-design/pro-components';
import { history, useModel, useParams } from '@umijs/max';
import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Input,
  Modal,
  message,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useDatasets } from '@/contexts/DatasetContext';
import type { Exchange } from '@/data/datasets';

const { Text, Title } = Typography;

const DetailPage: React.FC = () => {
  const { datasetId } = useParams<{ datasetId: string }>();
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState<
    'revision' | 'reject' | null
  >(null);
  const [reviewComment, setReviewComment] = useState('');
  const { getDatasetById, updateDatasetStatus } = useDatasets();

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
  const isOwner = dataset.createdBy === currentUser?.email;

  const canSubmit =
    isOwner &&
    (dataset.status === 'Draft' || dataset.status === 'Revision Required');
  const isVerifier = currentUser?.role === 'verifier';

  const canEdit =
    currentUser?.role === 'contributor' &&
    isOwner &&
    (dataset.status === 'Draft' || dataset.status === 'Revision Required');

  const canVerify = isVerifier && !isOwner && dataset.status === 'Under Review';

  const canReviewDecision =
    isVerifier && !isOwner && dataset.status === 'Under Review';

  const canStartReview =
    isVerifier && !isOwner && dataset.status === 'Submitted';

  const handleStartReview = () => {
    updateDatasetStatus(dataset.id, 'Under Review');
    message.success('Review started successfully.');
  };

  const handleVerify = () => {
    updateDatasetStatus(dataset.id, 'Verified', undefined, currentUser?.email);
    message.success('Dataset verified successfully.');
  };

  const openReviewModal = (action: 'revision' | 'reject') => {
    setReviewAction(action);
    setReviewComment('');
    setReviewModalOpen(true);
  };

  const handleReviewDecision = () => {
    const comment = reviewComment.trim();

    if (!comment) {
      message.warning('Please provide a reason.');
      return;
    }

    if (!reviewAction) return;

    const newStatus =
      reviewAction === 'revision' ? 'Revision Required' : 'Rejected';

    updateDatasetStatus(dataset.id, newStatus, comment, currentUser?.email);

    message.success(
      reviewAction === 'revision'
        ? 'Revision requested successfully.'
        : 'Dataset rejected successfully.',
    );

    setReviewModalOpen(false);
    setReviewAction(null);
    setReviewComment('');
  };

  const handleSubmitForReview = () => {
    updateDatasetStatus(dataset.id, 'Submitted', '');
    message.success('Dataset submitted for review successfully.');
  };
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
        ...(canEdit
          ? [
              <Button
                key="edit"
                onClick={() =>
                  history.push(`/datasets/new/manual?datasetId=${dataset.id}`)
                }
              >
                Edit Dataset
              </Button>,
            ]
          : []),
        ...(canSubmit
          ? [
              <Button
                key="submit"
                type="primary"
                onClick={handleSubmitForReview}
              >
                Submit for Review
              </Button>,
            ]
          : []),
        ...(canStartReview
          ? [
              <Button
                key="start-review"
                type="primary"
                onClick={handleStartReview}
              >
                Start Review
              </Button>,
            ]
          : []),
        ...(canVerify
          ? [
              <Button key="verify" type="primary" onClick={handleVerify}>
                Verify
              </Button>,
            ]
          : []),
        ...(canReviewDecision
          ? [
              <Button
                key="revision"
                onClick={() => openReviewModal('revision')}
              >
                Request Revision
              </Button>,
              <Button
                key="reject"
                danger
                onClick={() => openReviewModal('reject')}
              >
                Reject
              </Button>,
            ]
          : []),
        <Button key="back" onClick={() => history.push('/datasets')}>
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
              <Descriptions.Item label="Created By">
                {dataset.createdBy || '-'}
              </Descriptions.Item>
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

      {(dataset.status === 'Revision Required' ||
        dataset.status === 'Rejected') &&
        dataset.reviewComment && (
          <Alert
            style={{ marginTop: 16 }}
            type={dataset.status === 'Rejected' ? 'error' : 'warning'}
            showIcon
            message={
              dataset.status === 'Rejected'
                ? 'Dataset Rejected'
                : 'Revision Required'
            }
            description={dataset.reviewComment}
          />
        )}
      {!details && (
        <Alert
          style={{ marginTop: 16 }}
          type="info"
          showIcon
          message="This is a demo dataset"
          description="Detailed information has not been entered for this dataset."
        />
      )}
      <Modal
        title={
          reviewAction === 'revision'
            ? 'Request Dataset Revision'
            : 'Reject Dataset'
        }
        open={reviewModalOpen}
        onOk={handleReviewDecision}
        onCancel={() => {
          setReviewModalOpen(false);
          setReviewAction(null);
          setReviewComment('');
        }}
        okText={
          reviewAction === 'revision'
            ? 'Submit Revision Request'
            : 'Confirm Rejection'
        }
        okButtonProps={{
          danger: reviewAction === 'reject',
        }}
      >
        <Typography.Paragraph>
          {reviewAction === 'revision'
            ? 'Explain what needs to be corrected in this dataset.'
            : 'Provide a reason for rejecting this dataset.'}
        </Typography.Paragraph>

        <Input.TextArea
          rows={4}
          value={reviewComment}
          onChange={(event) => setReviewComment(event.target.value)}
          placeholder="Enter your comments or reason..."
          maxLength={1000}
          showCount
        />
      </Modal>
    </PageContainer>
  );
};

export default DetailPage;
