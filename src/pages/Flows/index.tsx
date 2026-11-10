import { PageContainer } from '@ant-design/pro-components';
import { Typography } from 'antd';

const Flows = () => {
  return (
    <PageContainer>
      <Typography.Title level={4}>Flows</Typography.Title>
      <Typography.Paragraph type="secondary">
        Manage and explore LCI flows.
      </Typography.Paragraph>
    </PageContainer>
  );
};

export default Flows;
