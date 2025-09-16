import React from 'react';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import avatar from '../../data/admin.jpg';

import { useLogout } from '../../hooks/useAuth.js';
import { useSelector } from 'react-redux';

import NotificationPanel from './NotificationPanel.jsx';
import Message from './Message.jsx';
import UserProfile from './UserProfile.jsx';
import { useStateContext } from '../../context/contextProvider.jsx';
const NavButton = ({ title, customeFunc, icon, color, dotColor }) => {
  return (
    <button
      onClick={customeFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  );
};

const Navbar = () => {
  const logout = useLogout();
  const { user } = useSelector((state) => state.auth);
  const { handleClick, isClicked, currentColor } = useStateContext();
  return (
    <div className="flex justify-end p-1 md:mx-6 relative bg-gray-50 z-50">
      <div className="flex">
        <NavButton
          dotColor="#03C907"
          title="Chat"
          customeFunc={() => handleClick('chat')}
          color="blue"
          icon={<BsChatLeft />}
        />
        <NavButton
          dotColor="#03C907"
          title="Notification"
          customeFunc={() => handleClick('notification')}
          color="blue"
          icon={<RiNotification3Line />}
        />
        <button onClick={logout}>logout</button>

        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => handleClick('userProfile')}
        >
          <img src={avatar} alt="" className="rounded-full h-8 w-8 " />
          <p>
            <span className="text-gray-400 text-14">Hi,</span>{' '}
            <span className="text-gray-400 text-14 font-bold">
              {user?.username}
            </span>
          </p>
          <MdKeyboardArrowDown />
        </div>
        {isClicked.chat && <Message />}
        {isClicked.notification && <NotificationPanel />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
