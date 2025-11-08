import { Navigate } from 'react-router-dom';
import CustomerLayout from '../components/customer/CustomerLayout';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function CustomerRoute({ children }) {
  const { isAuthenticated, loading, token, customer } = useSelector(
    (state) => state.customerAuth
  );
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    console.log('🔐 CustomerRoute - Auth state updated:', {
      isAuthenticated,
      loading,
      hasToken: !!token,
      customer: customer
        ? { id: customer.id, personId: customer.personId }
        : null,
      storedToken: localStorage.getItem('customerToken')
        ? 'Present'
        : 'Missing',
      initialCheckDone,
    });

    // Mark initial check as done after first load
    if (!loading && !initialCheckDone) {
      setInitialCheckDone(true);
    }
  }, [isAuthenticated, loading, token, customer, initialCheckDone]);

  // Show loading spinner only during initial load
  if (loading && !initialCheckDone) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customer portal...</p>
        </div>
      </div>
    );
  }

  // Only redirect if we're definitely not authenticated after initial load
  if (!isAuthenticated && initialCheckDone) {
    console.log('🔍 Debug info at redirect:', {
      tokenInRedux: !!token,
      tokenInStorage: !!localStorage.getItem('customerToken'),
      customerInRedux: !!customer,
      isAuthenticated,
    });
    return <Navigate to="/customer/login" replace />;
  }

  return <CustomerLayout>{children}</CustomerLayout>;
}
