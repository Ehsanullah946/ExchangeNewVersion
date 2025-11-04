// components/customer/CustomerNavbar.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutCustomer } from '../../features/customer/customerAuthSlice';

const CustomerNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customer } = useSelector((state) => state.customerAuth);

  const handleLogout = () => {
    dispatch(logoutCustomer());
    navigate('/customer/login');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Customer Dashboard
          </h2>
          <p className="text-sm text-gray-600">
            Welcome to your banking portal
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">
              Customer ID: {customer?.id}
            </p>
            <p className="text-xs text-gray-500">Customer Portal</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default CustomerNavbar;
