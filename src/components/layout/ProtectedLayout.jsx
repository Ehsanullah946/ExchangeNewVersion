// ProtectedLayout.jsx
import SideBar from './SideBar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Toast from '../common/Toast';
import { useSelector } from 'react-redux';

const ProtectedLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex">
      <SideBar userRole={user?.role} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-4">
          <Toast />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
