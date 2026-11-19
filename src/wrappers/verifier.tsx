import { history, useModel } from '@umijs/max';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import VerifierLayout from '@/layouts/VerifierLayout';

const VerifierWrapper: React.FC = () => {
  const { initialState, loading } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  useEffect(() => {
    if (loading) return;

    const { pathname, search, hash } = history.location;

    if (!currentUser) {
      history.replace(
        `/user/login?redirect=${encodeURIComponent(pathname + search + hash)}`,
      );
      return;
    }

    if (currentUser.role !== 'verifier') {
      history.replace('/welcome');
    }
  }, [loading, currentUser]);

  if (loading || currentUser?.role !== 'verifier') {
    return null;
  }

  return (
    <VerifierLayout>
      <Outlet />
    </VerifierLayout>
  );
};

export default VerifierWrapper;
