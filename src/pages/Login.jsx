import { useState } from 'react';
import { useLogin } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isLoading, isError } = useLogin();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {isError && <p style={{ color: 'red' }}>Invalid credentials</p>}
    </div>
  );
};

export default Login;
