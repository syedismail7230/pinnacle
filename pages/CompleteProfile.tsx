import React from 'react';
import { Navigate } from 'react-router-dom';

// This page has been deprecated in favor of collecting details during sign up.
const CompleteProfile = () => {
  return <Navigate to="/dashboard/overview" replace />;
};

export default CompleteProfile;