import { PageContainer } from '@ant-design/pro-components';
import { Typography } from 'antd';

const UnitGroupsPage: React.FC = () => {
  return (
    <PageContainer title="Unit Groups">
      <Typography.Text type="secondary">
        Manage unit groups and their measurement units.
      </Typography.Text>
    </PageContainer>
  );
};

export default UnitGroupsPage;
