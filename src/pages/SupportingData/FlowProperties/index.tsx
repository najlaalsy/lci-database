import { PageContainer } from '@ant-design/pro-components';
import { Typography } from 'antd';

const FlowPropertiesPage: React.FC = () => {
  return (
    <PageContainer title="Flow Properties">
      <Typography.Text type="secondary">
        Manage properties associated with LCI flows.
      </Typography.Text>
    </PageContainer>
  );
};

export default FlowPropertiesPage;
