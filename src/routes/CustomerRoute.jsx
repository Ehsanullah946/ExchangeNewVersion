// routes/CustomerRoute.jsx - Updated with better debugging
import { Navigate } from 'react-router-dom';
import CustomerLayout from '../components/customer/CustomerLayout';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function CustomerRoute({ children }) {
  const { isAuthenticated, loading, token, customer } = useSelector(
    (state) => state.customerAuth
  );

  useEffect(() => {
    console.log('🔐 CustomerRoute auth state:', {
      isAuthenticated,
      loading,
      hasToken: !!token,
      customer,
      storedToken: localStorage.getItem('customerToken'),
    });
  }, [isAuthenticated, loading, token, customer]);

  if (loading) {
    console.log('⏳ CustomerRoute: Loading...');
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('🚫 CustomerRoute: Not authenticated, redirecting to login');
    return <Navigate to="/customer/login" replace />;
  }

  console.log('✅ CustomerRoute: Authenticated, rendering children');
  return <CustomerLayout>{children}</CustomerLayout>;
}
