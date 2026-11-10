import { PageContainer } from '@ant-design/pro-components';
import { Typography } from 'antd';

const Processes = () => {
  return (
    <PageContainer>
      <Typography.Title level={4}>Processes</Typography.Title>
      <Typography.Paragraph type="secondary">
        Browse industrial activities based on ISIC Revision 5.
      </Typography.Paragraph>
    </PageContainer>
  );
};

export default Processes;
