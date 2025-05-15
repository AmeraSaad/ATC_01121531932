import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout; 