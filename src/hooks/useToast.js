// hooks/useToast.js
import { useDispatch } from 'react-redux';
import { showToast } from '../features/toast/toastSlice';

export const useToast = () => {
  const dispatch = useDispatch();

  const toast = {
    error: (message, duration = 5000) => {
      dispatch(showToast({ message, type: 'error', duration }));
    },
    success: (message, duration = 3000) => {
      dispatch(showToast({ message, type: 'success', duration }));
    },
    warning: (message, duration = 4000) => {
      dispatch(showToast({ message, type: 'warning', duration }));
    },
    info: (message, duration = 4000) => {
      dispatch(showToast({ message, type: 'info', duration }));
    },
  };

  return toast;
};
