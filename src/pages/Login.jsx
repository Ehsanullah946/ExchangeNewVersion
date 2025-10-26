import { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { initializeAuth } from '../features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {
    mutate: login,
    isLoading,
    isError,
    error: mutationError,
  } = useLogin();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Initialize auth state on component mount
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      setError(mutationError?.response?.data?.message || 'Invalid credentials');
    }
  }, [isError, mutationError]);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    login({ email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
