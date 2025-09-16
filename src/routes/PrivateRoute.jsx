import { Navigate } from 'react-router-dom';
import ProtectedLayout from '../components/layout/ProtectedLayout';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ roles }) {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Role-based protection
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <ProtectedLayout />;
}
