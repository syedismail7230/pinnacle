import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import { Login, OTP } from './pages/Auth';
import Overview from './pages/Overview';
import ITC from './pages/ITC';
import Sales from './pages/Sales';
import Compliance from './pages/Compliance';
import GSTConnect from './pages/GSTConnect';
import { Customers, AdminSubscriptions } from './pages/Admin';
import Subscription from './pages/Subscription';
import Settings from './pages/Settings';
import Legal from './pages/Legal';
import Support from './pages/Support';
import { useAuth } from './context/AuthContext';
import Tour from './components/Tour';

// Protected Route Wrapper
const ProtectedRoute = ({ allowedRoles }: { allowedRoles?: ('admin' | 'user')[] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to their respective home page if role not allowed
    return <Navigate to={user.role === 'admin' ? '/admin/customers' : '/dashboard/overview'} replace />;
  }

  return (
    <Layout>
      {user?.role === 'user' && <Tour />}
      <Outlet />
    </Layout>
  );
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/legal" element={<Legal />} />
        
        {/* User Routes */}
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
           <Route path="/" element={<Overview />} />
           <Route path="/dashboard" element={<Navigate to="/dashboard/overview" replace />} />
           <Route path="/dashboard/overview" element={<Overview />} />
           <Route path="/dashboard/itc" element={<ITC />} />
           <Route path="/dashboard/sales" element={<Sales />} />
           <Route path="/dashboard/compliance" element={<Compliance />} />
           <Route path="/gst-connection" element={<GSTConnect />} />
           <Route path="/subscription" element={<Subscription />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
           <Route path="/admin" element={<Navigate to="/admin/customers" replace />} />
           <Route path="/admin/customers" element={<Customers />} />
           <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
        </Route>

        {/* Shared Routes (Accessible by both if authenticated) */}
        <Route element={<ProtectedRoute />}>
           <Route path="/settings" element={<Settings />} />
           <Route path="/support" element={<Support />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;