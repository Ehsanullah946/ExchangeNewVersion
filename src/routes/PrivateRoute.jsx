import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedLayout from '../components/layout/ProtectedLayout';

export default function PrivateRoute({ roles }) {
  const { user, loading } = useAuth();

  if (loading) return <div>loading....</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <ProtectedLayout />;
}
