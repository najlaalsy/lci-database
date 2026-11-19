import {
  AppstoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { history, Link } from '@umijs/max';
import React from 'react';
import { AvatarDropdown } from '@/components';

interface VerifierLayoutProps {
  children: React.ReactNode;
}

const VerifierLayout: React.FC<VerifierLayoutProps> = ({ children }) => {
  const menuData = [
    {
      path: '/verifier/dashboard',
      name: 'Dashboard',
      icon: <AppstoreOutlined />,
    },
    {
      path: '/verifier/review-queue',
      name: 'Review Queue',
      icon: <ClockCircleOutlined />,
    },
    {
      path: '/verifier/history',
      name: 'Verification History',
      icon: <CheckCircleOutlined />,
    },
  ];

  return (
    <ProLayout
      title="LCI Database"
      logo="/logo.png"
      layout="side"
      navTheme="light"
      contentWidth="Fluid"
      fixedHeader
      fixSiderbar
      location={{
        pathname: history.location.pathname,
      }}
      menuDataRender={() => menuData}
      menuItemRender={(item, dom) => (
        <Link to={item.path || '/verifier/dashboard'}>{dom}</Link>
      )}
      avatarProps={{
        title: 'Verifier',
        render: (_, avatarChildren) => (
          <AvatarDropdown>{avatarChildren}</AvatarDropdown>
        ),
      }}
    >
      {children}
    </ProLayout>
  );
};

export default VerifierLayout;
