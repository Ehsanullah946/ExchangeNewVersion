import React, { useState } from 'react';
import { MdOutlineCancel, MdOutlineMarkEmailRead } from 'react-icons/md';
import { BsChatDots, BsCheck2, BsCheck2All, BsThreeDots } from 'react-icons/bs';
import { useStateContext } from '../../context/contextProvider.jsx';
import { chatData } from '../../data/dummy.jsx';
import { useTranslation } from 'react-i18next';

const Message = () => {
  const { currentColor, handleClick } = useStateContext();
  const { t } = useTranslation();
  const [activeChat, setActiveChat] = useState(null);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <BsCheck2All className="text-blue-500 text-sm" />;
      case 'read':
        return <BsCheck2All className="text-green-500 text-sm" />;
      default:
        return <BsCheck2 className="text-gray-400 text-sm" />;
    }
  };

  const formatTime = (time) => {
    return time; // You can add time formatting logic here
  };

  return (
    <div className="absolute top-16 right-4 md:right-6 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/60 z-50 animate-in slide-in-from-right-8 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200/60">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <BsChatDots className="text-white text-lg" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{t('Messages')}</h3>
            <p className="text-sm text-gray-500">7 unread conversations</p>
          </div>
        </div>
        <button
          onClick={() => handleClick('chat')}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 group"
        >
          <MdOutlineCancel className="text-gray-500 text-xl group-hover:text-gray-700" />
        </button>
      </div>

      {/* Messages List */}
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {chatData?.map((item, index) => (
          <div
            key={index}
            className={`p-4 border-b border-gray-100/60 last:border-b-0 hover:bg-gray-50/80 transition-all duration-200 cursor-pointer group ${
              activeChat === index ? 'bg-blue-50/50 border-blue-200' : ''
            }`}
            onClick={() => setActiveChat(index)}
          >
            <div className="flex items-start gap-3">
              {/* Avatar with online status */}
              <div className="relative flex-shrink-0">
                <img
                  className="rounded-2xl h-12 w-12 border-2 border-white shadow-sm"
                  src={item.image}
                  alt={item.message}
                />
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-white rounded-full ${
                    item.online ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">
                    {item.message}
                  </h4>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {formatTime(item.time)}
                    </span>
                    {getStatusIcon(item.status)}
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {item.desc}
                </p>

                {/* Message Meta */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    {item.unread > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium min-w-6 text-center">
                        {item.unread}
                      </span>
                    )}
                    {item.typing && (
                      <span className="text-xs text-blue-500 font-medium animate-pulse">
                        typing...
                      </span>
                    )}
                  </div>

                  {item.attachment && (
                    <div className="flex items-center gap-1 text-gray-400">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs">1</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Options Menu */}
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-lg transition-all duration-200">
                <BsThreeDots className="text-gray-500 text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200/60 bg-gray-50/50 rounded-b-2xl">
        <div className="flex gap-2">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ background: currentColor }}
          >
            <MdOutlineMarkEmailRead className="text-lg" />
            {t('Mark all as read')}
          </button>
          <button className="flex-1 py-2.5 px-4 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-xl transition-all duration-200 hover:bg-white">
            {t('See all')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
