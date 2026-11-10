import { PageContainer } from '@ant-design/pro-components';
import { Empty } from 'antd';

const ImportDatasetPage: React.FC = () => {
  return (
    <PageContainer
      title="Import File"
      subTitle="Import LCI dataset from an external file."
    >
      <Empty description="Import File page is under development." />
    </PageContainer>
  );
};

export default ImportDatasetPage;
