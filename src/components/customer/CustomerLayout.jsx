// components/customer/CustomerLayout.jsx
import CustomerSidebar from './CustomerSidebar';
import CustomerNavbar from './CustomerNavbar';
import { Outlet } from 'react-router-dom';

const CustomerLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <CustomerSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CustomerNavbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;
