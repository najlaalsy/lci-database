import {
  CheckCircleOutlined,
  FileOutlined,
  InboxOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import type { UploadFile } from 'antd';
import {
  Alert,
  Button,
  Card,
  Descriptions,
  Empty,
  message,
  Space,
  Tag,
  Typography,
  Upload,
} from 'antd';
import { useState } from 'react';
import { useDatasets } from '@/contexts/DatasetContext';
import type { Dataset } from '@/data/datasets';

const { Dragger } = Upload;
const { Text, Paragraph } = Typography;

type ImportType = 'dataset' | 'single-entity';

interface ImportResult {
  type: ImportType;
  entityType: string;
  schemaVersion: string;
  data: Record<string, unknown>;
}

const supportedEntities = [
  'process',
  'flow',
  'flowProperty',
  'unitGroup',
  'source',
  'contact',
];

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const validateImportData = (
  value: unknown,
): { valid: boolean; result?: ImportResult; error?: string } => {
  if (!isObject(value)) {
    return {
      valid: false,
      error: 'Struktur JSON harus berupa object.',
    };
  }

  if (typeof value.schemaVersion !== 'string' || !value.schemaVersion) {
    return {
      valid: false,
      error: 'schemaVersion tidak ditemukan.',
    };
  }

  if (typeof value.entityType !== 'string') {
    return {
      valid: false,
      error: 'entityType tidak ditemukan.',
    };
  }

  if (!isObject(value.data)) {
    return {
      valid: false,
      error: 'Bagian data harus berupa object.',
    };
  }

  if (value.entityType === 'dataset') {
    const requiredSections = [
      'processInformation',
      'timeLocation',
      'technology',
      'inputs',
      'outputs',
      'dataQuality',
    ];

    for (const section of requiredSections) {
      if (!(section in value.data)) {
        return {
          valid: false,
          error: `Bagian ${section} tidak ditemukan.`,
        };
      }
    }

    if (
      !Array.isArray(value.data.inputs) ||
      !Array.isArray(value.data.outputs)
    ) {
      return {
        valid: false,
        error: 'Inputs dan Outputs harus berbentuk array.',
      };
    }

    const objectSections = [
      'processInformation',
      'timeLocation',
      'technology',
      'dataQuality',
    ];

    for (const section of objectSections) {
      if (!isObject(value.data[section])) {
        return {
          valid: false,
          error: `Bagian ${section} harus berbentuk object.`,
        };
      }
    }

    return {
      valid: true,
      result: {
        type: 'dataset',
        entityType: value.entityType,
        schemaVersion: value.schemaVersion,
        data: value.data,
      },
    };
  }

  if (!supportedEntities.includes(value.entityType)) {
    return {
      valid: false,
      error: `Jenis entity "${value.entityType}" belum didukung.`,
    };
  }

  return {
    valid: true,
    result: {
      type: 'single-entity',
      entityType: value.entityType,
      schemaVersion: value.schemaVersion,
      data: value.data,
    },
  };
};

const ImportDatasetPage: React.FC = () => {
  const { addDataset, datasets } = useDatasets();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [jsonPreview, setJsonPreview] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');
  const [imported, setImported] = useState(false);

  const handleFileChange = (newFileList: UploadFile[]) => {
    setFileList(newFileList.slice(-1));
    setImportResult(null);
    setJsonPreview('');
    setValidationError('');
    setImported(false);
  };

  const handleValidate = async () => {
    const file = fileList[0]?.originFileObj;

    if (!file) {
      message.warning('Please select a JSON file first.');
      return;
    }

    try {
      const content = await file.text();
      const parsed: unknown = JSON.parse(content);

      const validation = validateImportData(parsed);

      if (!validation.valid || !validation.result) {
        setImportResult(null);
        setJsonPreview('');
        setValidationError(validation.error || 'Invalid JSON structure.');
        return;
      }

      setImportResult(validation.result);
      setJsonPreview(JSON.stringify(parsed, null, 2));
      setValidationError('');

      message.success('JSON validation completed.');
    } catch {
      setImportResult(null);
      setJsonPreview('');
      setValidationError('File tidak dapat dibaca sebagai JSON yang valid.');
    }
  };

  const handleImport = () => {
    if (!importResult || importResult.entityType !== 'dataset') {
      return;
    }

    const details = importResult.data as unknown as NonNullable<
      Dataset['details']
    >;

    const newId = Math.max(0, ...datasets.map((dataset) => dataset.id)) + 1;

    const classCode = details.processInformation.classification || '';

    const newDataset: Dataset = {
      id: newId,
      name: details.processInformation.baseName,
      location: details.timeLocation.location || 'Not specified',
      reference: details.dataQuality.sourceReference || 'Not provided',
      type: 'Unit process',
      updatedAt: new Date().toISOString().slice(0, 10),
      classCode,
      status: 'Draft',
      details,
    };

    addDataset(newDataset);

    setImported(true);

    message.success('Dataset imported successfully.');

    if (classCode) {
      history.push(`/processes/${classCode}`);
    } else {
      history.push(`/datasets/new/detail/${newId}`);
    }
  };

  return (
    <PageContainer
      title="Import File"
      subTitle="Import LCI data from a JSON file."
    >
      <Card title="Upload JSON File" style={{ marginBottom: 24 }}>
        <Dragger
          accept=".json,application/json"
          maxCount={1}
          fileList={fileList}
          beforeUpload={(file) => {
            if (!file.name.toLowerCase().endsWith('.json')) {
              message.error('Only JSON files are supported.');
              return Upload.LIST_IGNORE;
            }

            if (file.size > 10 * 1024 * 1024) {
              message.error('Maximum file size is 10 MB.');
              return Upload.LIST_IGNORE;
            }

            return false;
          }}
          onChange={({ fileList: newFileList }) =>
            handleFileChange(newFileList)
          }
          onRemove={() => {
            setImportResult(null);
            setJsonPreview('');
            setValidationError('');
            setImported(false);
            return true;
          }}
        >
          <p>
            <InboxOutlined style={{ fontSize: 42, color: '#1677ff' }} />
          </p>
          <p>Click or drag a JSON file to this area</p>
          <p style={{ color: '#888' }}>
            Supported format: JSON. Maximum file size: 10 MB.
          </p>
        </Dragger>

        <Space style={{ marginTop: 20 }}>
          <Button
            type="primary"
            icon={<FileOutlined />}
            disabled={fileList.length === 0}
            onClick={handleValidate}
          >
            Validate JSON
          </Button>
        </Space>
      </Card>

      {validationError && (
        <Alert
          type="error"
          showIcon
          message="Validation Failed"
          description={validationError}
          style={{ marginBottom: 24 }}
        />
      )}

      {importResult && (
        <>
          <Card title="Import Summary" style={{ marginBottom: 24 }}>
            <Alert
              type="success"
              showIcon
              message="JSON structure is valid."
              style={{ marginBottom: 20 }}
            />

            <Descriptions bordered column={2}>
              <Descriptions.Item label="Import Type">
                <Tag color="blue">
                  {importResult.type === 'dataset'
                    ? 'Complete Dataset'
                    : 'Single Entity'}
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Entity Type">
                {importResult.entityType}
              </Descriptions.Item>

              <Descriptions.Item label="Schema Version">
                {importResult.schemaVersion}
              </Descriptions.Item>

              <Descriptions.Item label="File Status">
                <Tag color="success">Valid</Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="JSON Preview" style={{ marginBottom: 24 }}>
            <Paragraph type="secondary">
              Review the JSON content before confirming the import.
            </Paragraph>

            <pre
              style={{
                background: '#f5f5f5',
                padding: 16,
                borderRadius: 8,
                maxHeight: 400,
                overflow: 'auto',
                fontSize: 12,
              }}
            >
              {jsonPreview}
            </pre>
          </Card>

          <Card title="Import Confirmation">
            {imported ? (
              <Alert
                type="success"
                showIcon
                icon={<CheckCircleOutlined />}
                message="Import simulation completed."
                description="The file passed structural validation. No database records were created or stored."
              />
            ) : (
              <Space>
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  onClick={handleImport}
                >
                  Confirm Import
                </Button>
                <Text type="secondary">Review the file before confirming.</Text>
              </Space>
            )}
          </Card>
        </>
      )}

      {!importResult && !validationError && fileList.length === 0 && (
        <Card>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No JSON file selected yet."
          />
        </Card>
      )}
    </PageContainer>
  );
};

export default ImportDatasetPage;
