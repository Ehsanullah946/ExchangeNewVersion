import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createDepositWithdraw,
  deleteDepositWithdraw,
  getDeposit,
  getSingleDepositWithdraw,
  updateDepositWithdraw,
} from '../api/DepositWithdrowApi';
import { Navigate } from 'react-router-dom';

export const useDeposit = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['deposit', search, limit, page],
    queryFn: () => getDeposit({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('something went worng:', error);
    },
  });
};

export const useSingleDepositWithdraw = (id) => {
  return useQuery({
    queryKey: ['deposit', id],
    queryFn: () => getSingleDepositWithdraw(id),
    enabled: !!id,
    onError: (error) => {
      console.log('something went worng:', error);
    },
  });
};

export const useCreateDeposit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepositWithdraw,
    onSuccess: () => {
      queryClient.invalidateQueries(['deposit']);
    },
  });
};
export const useUpdateWithdrawDeposit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDepositWithdraw,
    onSuccess: () => {
      queryClient.invalidateQueries(['deposit']);
    },
  });
};
export const useDeleteDepositWithdraw = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDepositWithdraw,
    onSuccess: () => {
      queryClient.invalidateQueries(['deposit']);
    },
  });
};
