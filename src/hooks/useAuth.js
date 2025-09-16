import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/auth';
import { logout, setCredentials } from '../features/auth/authSlice';
export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setCredentials(data));
    },
  });
};
export const useLogout = () => {
  const dispatch = useDispatch();
  return () => dispatch(logout());
};
