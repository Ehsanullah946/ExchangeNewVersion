import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDepositWithdraw, getDeposit } from '../api/DepositWithdrowApi';

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

export const useCreateDeposit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepositWithdraw,
    onSuccess: () => {
      queryClient.invalidateQueries(['deposit']);
    },
  });
};
