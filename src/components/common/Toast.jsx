// components/Toast.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast, clearToast } from '../../features/toast/toastSlice';
import {
  IoClose,
  IoWarning,
  IoCheckmarkCircle,
  IoInformationCircle,
  IoAlertCircle,
} from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = () => {
  const dispatch = useDispatch();
  const { isVisible, message, type, duration } = useSelector(
    (state) => state.toast
  );
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);
      }, 50);

      const timer = setTimeout(() => {
        dispatch(hideToast());
        clearInterval(interval);
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [isVisible, duration, dispatch]);

  useEffect(() => {
    if (isVisible) {
      setProgress(100);
    }
  }, [isVisible]);

  const handleClose = () => {
    dispatch(hideToast());
  };

  const getToastStyles = () => {
    const baseStyles = {
      success: {
        bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
        border: 'border border-green-200/80',
        text: 'text-green-900',
        icon: 'text-green-600',
        iconBg: 'bg-green-500',
        gradient: 'from-green-500 to-emerald-500',
        iconComponent: <IoCheckmarkCircle className="w-6 h-6" />,
      },
      warning: {
        bg: 'bg-gradient-to-r from-amber-50 to-orange-50',
        border: 'border border-amber-200/80',
        text: 'text-amber-900',
        icon: 'text-amber-600',
        iconBg: 'bg-amber-500',
        gradient: 'from-amber-500 to-orange-500',
        iconComponent: <IoWarning className="w-6 h-6" />,
      },
      info: {
        bg: 'bg-gradient-to-r from-blue-50 to-cyan-50',
        border: 'border border-blue-200/80',
        text: 'text-blue-900',
        icon: 'text-blue-600',
        iconBg: 'bg-blue-500',
        gradient: 'from-blue-500 to-cyan-500',
        iconComponent: <IoInformationCircle className="w-6 h-6" />,
      },
      error: {
        bg: 'bg-gradient-to-r from-red-50 to-rose-50',
        border: 'border border-red-200/80',
        text: 'text-red-900',
        icon: 'text-red-600',
        iconBg: 'bg-red-500',
        gradient: 'from-red-500 to-rose-500',
        iconComponent: <IoAlertCircle className="w-6 h-6" />,
      },
    };

    return baseStyles[type] || baseStyles.info;
  };

  const styles = getToastStyles();

  const toastVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-0 bottom-0 right-0 left-0 md:left-auto md:right-4 z-[999999] max-w-sm mx-auto md:mx-0 pointer-events-none">
          <motion.div
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative rounded-2xl shadow-2xl backdrop-blur-sm ${styles.bg} ${styles.border} pointer-events-auto overflow-hidden`}
          >
            {/* Main Content */}
            <div className="flex items-start p-5">
              {/* Icon */}
              <div className="flex-shrink-0 mr-4">
                <div
                  className={`p-2 rounded-xl bg-white/80 shadow-lg border ${styles.border}`}
                >
                  <div className={styles.icon}>{styles.iconComponent}</div>
                </div>
              </div>

              {/* Message */}
              <div className="flex-1 min-w-0 mr-3">
                <p
                  className={`text-sm font-semibold leading-relaxed ${styles.text}`}
                >
                  {message}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="flex-shrink-0 p-1 hover:bg-white/50 rounded-lg transition-all duration-200 group"
              >
                <IoClose
                  className={`w-4 h-4 ${styles.icon} group-hover:scale-110 transition-transform`}
                />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50">
              <motion.div
                className={`h-full bg-gradient-to-r ${styles.gradient} shadow-sm`}
                initial={{ width: '100%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-16 h-16 -translate-x-8 -translate-y-8 opacity-10">
              <div
                className={`w-full h-full rounded-full bg-gradient-to-r ${styles.gradient}`}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
