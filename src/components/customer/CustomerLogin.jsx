import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useInitiateVerification,
  useVerifyCode,
} from '../../hooks/useCustomerAuth';
import { resetVerification } from '../../features/customer/customerAuthSlice';

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const dispatch = useDispatch();
  const { verificationStep, verificationEmail, loading } = useSelector(
    (state) => state.customerAuth
  );

  const initiateVerification = useInitiateVerification();
  const verifyCodeMutation = useVerifyCode();

  useEffect(() => {
    dispatch(resetVerification());
  }, [dispatch]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (!email || !organizationId) {
      setError('Email and organization ID are required');
      return;
    }

    try {
      const result = await initiateVerification.mutateAsync({
        email,
        organizationId,
      });

      if (result.message) {
        setInfo(result.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to send verification code'
      );
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!code) {
      setError('Verification code is required');
      return;
    }

    try {
      await verifyCodeMutation.mutateAsync({
        email: verificationEmail,
        code,
        organizationId,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid verification code');
    }
  };

  const handleBackToEmail = () => {
    dispatch(resetVerification());
    setCode('');
    setError('');
    setInfo('');
  };

  if (verificationStep === 'code') {
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8"
        style={{
          background:
            'url(https://cdn.magdeleine.co/wp-content/uploads/2014/05/3jPYgeVCTWCMqjtb7Dqi_IMG_8251-1400x933.jpg) no-repeat center center fixed',
          backgroundSize: 'cover',
        }}
      >
        <div
          className="w-full max-w-md bg-black bg-opacity-25 rounded-lg shadow-xl backdrop-blur-sm border border-white border-opacity-20"
          style={{ boxShadow: '1px 1px 50px #000' }}
        >
          <div className="py-8 px-8">
            <h1 className="text-center text-4xl font-bold text-white mb-2 font-sans text-shadow-lg">
              Enter Verification Code
            </h1>
            <p className="text-center text-sm text-gray-200 mb-4">
              We sent a code to {verificationEmail}
            </p>
            <p className="text-center text-xs text-gray-300 mb-6">
              After verification, you'll stay logged in for 30 days
            </p>

            {error && (
              <div className="mb-6 bg-red-900 bg-opacity-50 border border-red-700 text-red-200 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleCodeSubmit}>
              <div>
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 bg-black bg-opacity-40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  style={{
                    boxShadow: '3px 3px 10px rgba(0,0,0,0.3)',
                  }}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleBackToEmail}
                  className="flex-1 py-3 px-4 border border-gray-600 rounded-lg text-sm font-medium text-white bg-black bg-opacity-40 hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  style={{
                    boxShadow: '3px 3px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 bg-opacity-70 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
                  style={{
                    boxShadow: '3px 3px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage: '',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="w-full max-w-md bg-black bg-opacity-25 rounded-lg shadow-xl backdrop-blur-sm border border-white border-opacity-20"
        style={{ boxShadow: '1px 1px 50px #000' }}
      >
        <div className="py-8 px-8">
          <h1 className="text-center text-4xl font-bold text-white mb-2 font-sans text-shadow-lg">
            Customer Login
          </h1>
          <p className="text-center text-sm text-gray-200 mb-4">
            Enter your email to access your account
          </p>
          <p className="text-center text-xs text-gray-300 mb-6">
            Returning customers will be automatically logged in for 30 days
          </p>

          {error && (
            <div className="mb-6 bg-red-900 bg-opacity-50 border border-red-700 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleEmailSubmit}>
            <div>
              <input
                id="organizationId"
                name="organizationId"
                type="text"
                required
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
                className="w-full px-4 py-3 bg-black bg-opacity-40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your organization ID"
                style={{
                  boxShadow: '3px 3px 10px rgba(0,0,0,0.3)',
                }}
              />
            </div>

            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black bg-opacity-40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email address"
                style={{
                  boxShadow: '3px 3px 10px rgba(0,0,0,0.3)',
                }}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 bg-opacity-70 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
                style={{
                  boxShadow: '3px 3px 10px rgba(0,0,0,0.3)',
                }}
              >
                {loading ? 'Checking...' : 'Continue to Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
