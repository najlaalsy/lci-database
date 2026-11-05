import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Helmet, history } from '@umijs/max';
import { App, Tabs } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh',
    overflow: 'auto',
    backgroundImage:
      "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
    backgroundSize: '100% 100%',
  },
}));

const Register: React.FC = () => {
  const { styles } = useStyles();
  const { message } = App.useApp();

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Sign Up | Indonesia LCI Database</title>
      </Helmet>

      <div
        style={{
          flex: 1,
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.png" />}
          title="Indonesia LCI Database"
          subTitle="Life Cycle Inventory Management System"
          submitter={{
            searchConfig: {
              submitText: 'Sign Up',
            },
          }}
          onFinish={async () => {
            message.info('Registration is not available yet.');
            return true;
          }}
        >
          <Tabs
            activeKey="register"
            centered
            onChange={(key) => {
              if (key === 'account') {
                history.push('/user/login');
              }
            }}
            items={[
              {
                key: 'account',
                label: 'Login',
              },
              {
                key: 'register',
                label: 'Sign Up',
              },
            ]}
          />

          <ProFormText
            name="email"
            fieldProps={{
              size: 'large',
              prefix: <MailOutlined />,
            }}
            placeholder="Email"
            rules={[
              {
                required: true,
                message: 'Please enter your email.',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address.',
              },
            ]}
          />

          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="Password"
            rules={[
              {
                required: true,
                message: 'Please enter a password.',
              },
            ]}
          />

          <ProFormText.Password
            name="confirmPassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="Confirm password"
            rules={[
              {
                required: true,
                message: 'Please confirm your password.',
              },
            ]}
          />
        </LoginForm>
      </div>
    </div>
  );
};

export default Register;
