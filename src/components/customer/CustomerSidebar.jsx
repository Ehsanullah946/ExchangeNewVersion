// components/customer/CustomerSidebar.jsx
import { NavLink } from 'react-router-dom';

const CustomerSidebar = () => {
  const menuItems = [
    { path: '/customer', label: 'Dashboard', icon: '📊' },
    { path: '/customer/accounts', label: 'My Accounts', icon: '🏦' },
    { path: '/customer/transactions', label: 'Transactions', icon: '💳' },
    { path: '/customer/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col">
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-xl font-bold">Customer Portal</h1>
        <p className="text-blue-200 text-sm mt-1">Banking Services</p>
      </div>

      <nav className="flex-1 mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-blue-100 hover:bg-blue-700 transition ${
                isActive ? 'bg-blue-900 border-r-4 border-yellow-400' : ''
              }`
            }
          >
            <span className="text-lg mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default CustomerSidebar;
