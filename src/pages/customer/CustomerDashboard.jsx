import { useCustomerAccounts } from '../../hooks/useCustomerAuth';

const CustomerDashboard = () => {
  const { data, isLoading, error } = useCustomerAccounts();

  const accounts = data?.accounts || [];

  console.log('customer account', accounts);
  if (isLoading) return <div>Loading accounts...</div>;
  if (error) return <div>Error loading accounts: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Account Overview
        </h1>
        <p className="text-gray-600">
          Your account summary and recent activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts?.map((account) => (
          <div key={account.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">
              {account.accountType}
            </h3>
            <p className="text-2xl font-bold text-green-600">
              ${account.originalBalance?.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Account: {account.accountNumber}
            </p>
            <p
              className={`text-sm mt-2 ${
                account.status === 'active' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {account.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
