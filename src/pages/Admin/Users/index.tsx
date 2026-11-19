import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Modal,
  message,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import {
  createUser,
  getUsers,
  updateUser,
  updateUserStatus,
} from '@/services/ant-design-pro/api';

const { Text } = Typography;

const UsersPage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const isAdmin = initialState?.currentUser?.role === 'admin';
  const [users, setUsers] = useState<API.User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<API.User | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editForm] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await getUsers();
      setUsers(response.data || []);
    } catch (error) {
      message.error('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };
  const handleAddUser = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);

      const response = await createUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      });

      if (response.success) {
        message.success('User created successfully.');
        setAddModalOpen(false);
        form.resetFields();
        await fetchUsers();
      }
    } catch (error: any) {
      if (error?.errorFields) {
        return;
      }

      message.error(error?.data?.message || 'Failed to create user.');
    } finally {
      setSaving(false);
    }
  };
  const handleOpenEdit = (user: API.User) => {
    setEditingUser(user);
    editForm.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setEditModalOpen(true);
  };
  const handleEditUser = async () => {
    if (!editingUser) return;

    try {
      const values = await editForm.validateFields();
      setEditSaving(true);

      const response = await updateUser(editingUser.id, {
        name: values.name,
        email: values.email,
        role: values.role,
      });

      if (response.success) {
        message.success('User updated successfully.');
        setEditModalOpen(false);
        setEditingUser(null);
        editForm.resetFields();
        await fetchUsers();
      }
    } catch (error: any) {
      if (error?.errorFields) return;

      message.error(error?.data?.message || 'Failed to update user.');
    } finally {
      setEditSaving(false);
    }
  };
  const handleChangeStatus = async (user: API.User) => {
    const newStatus: API.UserStatus =
      user.status === 'Active' ? 'Inactive' : 'Active';

    try {
      const response = await updateUserStatus(user.id, newStatus);

      if (response.success) {
        message.success(
          `User ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully.`,
        );

        await fetchUsers();
      }
    } catch (error: any) {
      message.error(error?.data?.message || 'Failed to update user status.');
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase());

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    const matchesStatus =
      statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleLabel = (role: API.UserRole) => {
    const labels: Record<API.UserRole, string> = {
      admin: 'Administrator',
      contributor: 'Contributor',
      verifier: 'Verifier',
    };

    return labels[role];
  };

  const columns: ColumnsType<API.User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{record.name}</Text>
          <Text type="secondary">{record.email}</Text>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: API.UserRole) => {
        const colors: Record<API.UserRole, string> = {
          admin: 'purple',
          contributor: 'blue',
          verifier: 'cyan',
        };

        return <Tag color={colors[role]}>{getRoleLabel(role)}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: API.UserStatus) => (
        <Tag color={status === 'Active' ? 'success' : 'default'}>{status}</Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => handleOpenEdit(record)}
          >
            Edit
          </Button>

          <Button
            type="link"
            size="small"
            danger={record.status === 'Active'}
            disabled={record.id === '1'}
            onClick={() => handleChangeStatus(record)}
          >
            {record.status === 'Active' ? 'Deactivate' : 'Activate'}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="User Management"
      subTitle="Manage user accounts and access roles"
    >
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Alert
            message="User Account Management"
            description="Manage registered users, assign access roles, and monitor account status."
            type="info"
            showIcon
          />

          <Space
            style={{
              width: '100%',
              justifyContent: 'space-between',
            }}
            wrap
          >
            <Space wrap>
              <Input
                placeholder="Search name or email"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                allowClear
                style={{ width: 240 }}
              />

              <Select
                value={roleFilter}
                onChange={setRoleFilter}
                style={{ width: 160 }}
                options={[
                  { label: 'All Roles', value: 'all' },
                  { label: 'Administrator', value: 'admin' },
                  { label: 'Contributor', value: 'contributor' },
                  { label: 'Verifier', value: 'verifier' },
                ]}
              />

              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: 140 }}
                options={[
                  { label: 'All Status', value: 'all' },
                  { label: 'Active', value: 'Active' },
                  { label: 'Inactive', value: 'Inactive' },
                ]}
              />
            </Space>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setAddModalOpen(true)}
            >
              Add User
            </Button>
          </Space>

          <Table<API.User>
            rowKey="id"
            columns={columns}
            dataSource={filteredUsers}
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} users`,
            }}
          />
        </Space>
      </Card>
      <Modal
        title="Add New User"
        open={addModalOpen}
        onCancel={() => {
          setAddModalOpen(false);
          form.resetFields();
        }}
        onOk={handleAddUser}
        confirmLoading={saving}
        okText="Create User"
        cancelText="Cancel"
        destroyOnHidden
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter the user name.' }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter an email.' },
              { type: 'email', message: 'Please enter a valid email.' },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter a password.' },
              {
                min: 8,
                message: 'Password must contain at least 8 characters.',
              },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role.' }]}
          >
            <Select
              placeholder="Select user role"
              options={[
                { label: 'Contributor', value: 'contributor' },
                { label: 'Verifier', value: 'verifier' },
                { label: 'Administrator', value: 'admin' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit User"
        open={editModalOpen}
        onCancel={() => {
          setEditModalOpen(false);
          setEditingUser(null);
          editForm.resetFields();
        }}
        onOk={handleEditUser}
        confirmLoading={editSaving}
        okText="Save Changes"
        cancelText="Cancel"
        destroyOnHidden
      >
        <Form form={editForm} layout="vertical" preserve={false}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter the user name.' }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter an email.' },
              { type: 'email', message: 'Please enter a valid email.' },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role.' }]}
          >
            <Select
              placeholder="Select user role"
              options={[
                { label: 'Contributor', value: 'contributor' },
                { label: 'Verifier', value: 'verifier' },
                { label: 'Administrator', value: 'admin' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default UsersPage;
