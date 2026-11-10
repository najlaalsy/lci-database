import {
  EditOutlined,
  FileExcelOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history, useLocation } from '@umijs/max';
import { Card, Col, Row, Typography } from 'antd';

const { Paragraph, Text, Title } = Typography;

const NewDatasetPage: React.FC = () => {
  const location = useLocation();

  const navigateTo = (path: string) => {
    history.push(`${path}${location.search}`);
  };

  return (
    <PageContainer
      title="Add New Dataset"
      subTitle="Choose how you want to add Life Cycle Inventory data."
      breadcrumb={{
        items: [
          { title: 'Processes' },
          { title: 'Dataset List' },
          { title: 'Add New Dataset' },
        ],
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <Title level={5}>Select Input Method</Title>
        <Paragraph type="secondary">
          Choose one of the following methods to add a new dataset to the
          database.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card
            hoverable
            style={{ height: '100%' }}
            onClick={() => navigateTo('/datasets/new/manual')}
          >
            <div style={{ padding: 12 }}>
              <EditOutlined
                style={{ fontSize: 32, color: '#1677ff', marginBottom: 20 }}
              />

              <Title level={4}>Manual Input</Title>

              <Paragraph type="secondary">
                Enter dataset information directly through the provided form.
                Suitable for adding individual process and flow records.
              </Paragraph>

              <Text style={{ color: '#1677ff', fontWeight: 500 }}>
                Continue <RightOutlined />
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            hoverable
            style={{ height: '100%' }}
            onClick={() => navigateTo('/datasets/new/import')}
          >
            <div style={{ padding: 12 }}>
              <FileExcelOutlined
                style={{ fontSize: 32, color: '#389e0d', marginBottom: 20 }}
              />

              <Title level={4}>Import File</Title>

              <Paragraph type="secondary">
                Upload an LCI dataset file for preview and validation before
                adding its records to the database.
              </Paragraph>

              <Text style={{ color: '#1677ff', fontWeight: 500 }}>
                Continue <RightOutlined />
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default NewDatasetPage;
