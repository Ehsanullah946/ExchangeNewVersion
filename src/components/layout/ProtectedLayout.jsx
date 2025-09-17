// ProtectedLayout.jsx
import SideBar from './SideBar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Toast from '../common/Toast';

const ProtectedLayout = () => {
  return (
    <div className="flex justify-around">
      <SideBar />
      <div className="flex-1">
        <Navbar />
        <Toast />
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedLayout;
