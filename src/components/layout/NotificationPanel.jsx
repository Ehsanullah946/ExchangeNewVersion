import React from 'react';
import { MdOutlineCancel, MdOutlineMarkEmailRead } from 'react-icons/md';
import {
  BsBell,
  BsCheckCircle,
  BsExclamationCircle,
  BsInfoCircle,
} from 'react-icons/bs';
import { useStateContext } from '../../context/contextProvider.jsx';
import { notificationData } from '../../data/dummy.jsx';
import { useTranslation } from 'react-i18next';

const NotificationPanel = () => {
  const { currentColor, handleClick } = useStateContext();
  const { t } = useTranslation();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <BsCheckCircle className="text-green-500 text-lg" />;
      case 'warning':
        return <BsExclamationCircle className="text-amber-500 text-lg" />;
      case 'info':
        return <BsInfoCircle className="text-blue-500 text-lg" />;
      default:
        return <BsBell className="text-gray-500 text-lg" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="absolute w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/60 z-50 animate-in slide-in-from-right-8 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200/60">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl">
            <BsBell className="text-white text-lg" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">
              {t('Notifications')}
            </h3>
            <p className="text-sm text-gray-500">5 new messages</p>
          </div>
        </div>
        <button
          onClick={() => handleClick('notification')}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 group"
        >
          <MdOutlineCancel className="text-gray-500 text-xl group-hover:text-gray-700" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto custom-scrollbar">
        {notificationData?.map((item, index) => (
          <div
            key={index}
            className={`p-4 border-b border-gray-100/60 last:border-b-0 hover:bg-gray-50/80 transition-colors duration-200 cursor-pointer group ${getNotificationColor(
              item.type
            )}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">
                    {item.message}
                  </p>
                  <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  {item.desc}
                </p>
                {item.status && (
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.status === 'completed'
                          ? 'bg-green-500'
                          : item.status === 'pending'
                          ? 'bg-amber-500'
                          : 'bg-blue-500'
                      }`}
                    />
                    <span className="text-xs font-medium text-gray-500 capitalize">
                      {item.status}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200/60 bg-gray-50/50 rounded-b-2xl">
        <div className="flex gap-2">
          <button
            className="flex-1 flex items-center justify-center gap-1 py-2 px-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ background: currentColor }}
          >
            <MdOutlineMarkEmailRead className="text-lg" />
            {t('Mark as read')}
          </button>
          <button className="flex-1 py-2 px-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-xl transition-all duration-200 hover:bg-white">
            {t('See all')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
