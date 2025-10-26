// PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import ProtectedLayout from '../components/layout/ProtectedLayout';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children, roles }) {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Role-based protection
  if (roles && !roles.includes(user?.role)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          You don't have permission to access this page.
        </div>
      </div>
    );
  }

  return children;
}
