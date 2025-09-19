// components/Toast.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast, clearToast } from '../../features/toast/toastSlice';
import {
  IoClose,
  IoWarning,
  IoCheckmarkCircle,
  IoInformationCircle,
} from 'react-icons/io5';

const Toast = () => {
  const dispatch = useDispatch();
  const { isVisible, message, type, duration } = useSelector(
    (state) => state.toast
  );

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, dispatch]);

  const handleClose = () => {
    dispatch(hideToast());
  };

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 border-green-200',
          text: 'text-green-800',
          icon: 'text-green-500',
          iconComponent: <IoCheckmarkCircle className="w-6 h-6" />,
          progress: 'bg-green-500',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          text: 'text-yellow-800',
          icon: 'text-yellow-500',
          iconComponent: <IoWarning className="w-6 h-6" />,
          progress: 'bg-yellow-500',
        };
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-800',
          icon: 'text-blue-500',
          iconComponent: <IoInformationCircle className="w-6 h-6" />,
          progress: 'bg-blue-500',
        };
      default: // error
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          icon: 'text-red-500',
          iconComponent: <IoWarning className="w-6 h-6" />,
          progress: 'bg-red-500',
        };
    }
  };

  const styles = getToastStyles();

  if (!isVisible) return null;

  return (
    <div className="absolute m-auto top-0 bottom-0 right-0 left-0 w-90 z-200000 ax-w-smm  pointer-events-none">
      <div
        className={`transform transition-all duration-300 ease-in-out pointer-events-auto
          ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : '-translate-y-10 opacity-0'
          }
          border rounded-lg shadow-lg ${styles.bg}`}
      >
        <div className="flex items-start p-4">
          <div className={`flex-shrink-0 flex-1 ${styles.icon}`}>
            {styles.iconComponent}
          </div>
          <div className="ml-3 flex-1">
            <p className={`text-sm font-bold  ${styles.text}`}>{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="ml-4 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-gray-200">
          <div
            className={`h-full ${styles.progress} transition-all duration-${duration} ease-linear`}
            style={{
              width: isVisible ? '0%' : '100%',
              animation: `progressShrink ${duration}ms linear forwards`,
            }}
          />
        </div>

        <style jsx>{`
          @keyframes progressShrink {
            from {
              width: 100%;
            }
            to {
              width: 0%;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Toast;
