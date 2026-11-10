import { PageContainer } from '@ant-design/pro-components';
import { Typography } from 'antd';

const SupportingData = () => {
  return (
    <PageContainer>
      <Typography.Title level={4}>Supporting Data</Typography.Title>
      <Typography.Paragraph type="secondary">
        Manage supporting information for LCI data.
      </Typography.Paragraph>
    </PageContainer>
  );
};

export default SupportingData;
