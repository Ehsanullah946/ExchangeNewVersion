// components/customer/CustomerLayout.jsx
import CustomerSidebar from './CustomerSidebar';
import CustomerNavbar from './CustomerNavbar';
import { Outlet } from 'react-router-dom';
import Toast from '../common/Toast';

const CustomerLayout = () => {
  return (
    <CustomerSidebar>
      <div className="flex-1 flex flex-col min-h-screen">
        <CustomerNavbar />
        <div className="flex-1 overflow-auto bg-gray-50/50">
          <Toast />
          <Outlet />
        </div>
      </div>
    </CustomerSidebar>
  );
};

export default CustomerLayout;
