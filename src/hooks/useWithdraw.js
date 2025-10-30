import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createDepositWithdraw,
  deleteDepositWithdraw,
  getWithdraw,
  updateDepositWithdraw,
} from '../api/DepositWithdrowApi';

export const useWithdraw = (
  search = '',
  moneyType = '',
  fromDate = '',
  toDate = '',
  limit = 10,
  page = 1
) => {
  return useQuery({
    queryKey: ['withdraw', search, moneyType, fromDate, toDate, limit, page],
    queryFn: () =>
      getWithdraw({ search, moneyType, fromDate, toDate, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('something went worng:', error);
    },
  });
};

export const useCreateWithdraw = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepositWithdraw,
    onSuccess: () => {
      queryClient.invalidateQueries(['withdraw']);
    },
  });
};

export const useUpdateWithdrawDeposit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDepositWithdraw,
    onSuccess: () => {
      queryClient.invalidateQueries(['withdraw']);
    },
  });
};

export const useDeleteDepositWithdraw = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDepositWithdraw,
    onSuccess: () => {
      queryClient.invalidateQueries(['withdraw']);
    },
  });
};
