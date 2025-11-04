// routes/CustomerRoute.jsx
import { Navigate } from 'react-router-dom';
import CustomerLayout from '../components/customer/CustomerLayout';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function CustomerRoute({ children }) {
  const { isAuthenticated, loading, token, customer } = useSelector(
    (state) => state.customerAuth
  );

  useEffect(() => {
    console.log('🔐 CustomerRoute - Current auth state:', {
      isAuthenticated,
      loading,
      hasToken: !!token,
      customer,
      storedToken: localStorage.getItem('customerToken'),
    });
  }, [isAuthenticated, loading, token, customer]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/customer/login" replace />;
  }

  return <CustomerLayout>{children}</CustomerLayout>;
}
