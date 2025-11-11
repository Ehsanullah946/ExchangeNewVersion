// components/customer/CustomerLayout.jsx
import CustomerSidebar from './CustomerSidebar';
import CustomerNavbar from './CustomerNavbar';
import { Outlet } from 'react-router-dom';
import Toast from '../common/Toast';

const CustomerLayout = () => {
  return (
    <div className="flex">
      <CustomerSidebar />
      <div className="flex-1 flex flex-col">
        <CustomerNavbar />
        <main className="flex-1 overflow-auto p-4">
          <Toast />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;
