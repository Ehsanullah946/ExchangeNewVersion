import React, { useState, useRef, useEffect } from 'react';
import {
  BsChatLeft,
  BsBell,
  BsPersonCircle,
  BsGear,
  BsBoxArrowRight,
} from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import {
  MdKeyboardArrowDown,
  MdOutlineLightMode,
  MdOutlineDarkMode,
} from 'react-icons/md';
import avatar from '../../data/admin.jpg';
import { useLogout } from '../../hooks/useAuth.js';
import { useSelector } from 'react-redux';
import NotificationPanel from './NotificationPanel.jsx';
import Message from './Message.jsx';
import UserProfile from './UserProfile.jsx';
import { useStateContext } from '../../context/contextProvider.jsx';

const NavButton = ({ title, customeFunc, icon, color, dotColor, count }) => {
  return (
    <button
      onClick={customeFunc}
      className="relative p-2.5 rounded-xl transition-all duration-300 group hover:bg-white/80 hover:shadow-lg backdrop-blur-sm"
    >
      <div className="relative">
        <div
          className={`text-xl transition-transform duration-300 group-hover:scale-110 ${
            color === 'blue'
              ? 'text-blue-600'
              : color === 'green'
              ? 'text-green-600'
              : 'text-gray-600'
          }`}
        >
          {icon}
        </div>

        {/* Notification dot or count */}
        {(dotColor || count > 0) && (
          <div
            className={`absolute -top-1 -right-1 min-w-4 h-4 flex items-center justify-center text-xs font-bold text-white rounded-full ${
              count > 0 ? 'px-1' : 'w-2 h-2'
            }`}
            style={{
              background: count > 0 ? '#ef4444' : dotColor,
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
            }}
          >
            {count > 0 && count}
          </div>
        )}
      </div>

      {/* Tooltip */}
      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {title}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </button>
  );
};

const Navbar = () => {
  const logout = useLogout();
  const { user } = useSelector((state) => state.auth);
  const { handleClick, isClicked, currentColor } = useStateContext();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowQuickMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add your dark mode logic here
  };

  const handleUserMenuClick = () => {
    handleClick('userProfile');
    setShowQuickMenu(false);
  };

  // Sample data - replace with actual data
  const notificationCount = 3;
  const messageCount = 7;

  return (
    <div className="flex items-center justify-between p-4 md:px-6 bg-gradient-to-r from-white to-gray-50/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm relative z-50">
      {/* Search Bar - Optional */}
      <div className="hidden md:flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/80 border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl transition-all duration-300 hover:bg-white/80 hover:shadow-lg group"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <MdOutlineLightMode className="text-xl text-amber-500 transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <MdOutlineDarkMode className="text-xl text-gray-600 transition-transform duration-300 group-hover:scale-110" />
          )}
        </button>

        {/* Messages */}
        <NavButton
          title="Messages"
          customeFunc={() => handleClick('chat')}
          color="blue"
          icon={<BsChatLeft />}
          count={messageCount}
        />

        {/* Notifications */}
        <NavButton
          title="Notifications"
          customeFunc={() => handleClick('notification')}
          color="green"
          icon={<BsBell />}
          count={notificationCount}
        />

        {/* User Profile */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="flex items-center gap-3 p-2 rounded-xl transition-all duration-300 hover:bg-white/80 hover:shadow-lg group"
          >
            <div className="relative">
              <img
                src={avatar}
                alt="Profile"
                className="rounded-xl h-10 w-10 border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-900 leading-none">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500 mt-1">Admin</p>
            </div>

            <MdKeyboardArrowDown
              className={`text-gray-600 transition-transform duration-300 ${
                showQuickMenu ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Quick User Menu */}
          {showQuickMenu && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/60 py-2 z-50 animate-in fade-in-0 zoom-in-95">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-200/60">
                <div className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt="Profile"
                    className="rounded-xl h-12 w-12 border-2 border-white shadow-sm"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {user?.username}
                    </p>
                    <p className="text-sm text-gray-500">Administrator</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <button
                onClick={handleUserMenuClick}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50/80 transition-colors duration-200"
              >
                <BsPersonCircle className="text-gray-600 text-lg" />
                <span className="text-gray-700">View Profile</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50/80 transition-colors duration-200">
                <BsGear className="text-gray-600 text-lg" />
                <span className="text-gray-700">Settings</span>
              </button>

              <div className="border-t border-gray-200/60 my-1"></div>

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50/80 text-red-600 transition-colors duration-200 rounded-b-2xl"
              >
                <BsBoxArrowRight className="text-lg" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Panels */}
      {isClicked.chat && (
        <div className="absolute top-full right-20 mt-2 z-40">
          <Message />
        </div>
      )}

      {isClicked.notification && (
        <div className="absolute top-full right-32 mt-2 z-40">
          <NotificationPanel />
        </div>
      )}

      {isClicked.userProfile && (
        <div className="absolute top-full right-0 mt-2 z-40">
          <UserProfile />
        </div>
      )}
    </div>
  );
};

export default Navbar;
