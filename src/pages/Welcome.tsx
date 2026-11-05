import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Welcome = () => {
  return (
    <PageContainer>
      <Card>
        <Title level={2}>Indonesia LCI Database</Title>
        <Paragraph>
          Selamat datang di sistem manajemen basis data Life Cycle Inventory.
        </Paragraph>
        <Paragraph>
          Sistem ini dikembangkan untuk mendukung pengelolaan data inventori
          siklus hidup secara terstruktur.
        </Paragraph>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
