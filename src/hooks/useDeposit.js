import { useQuery } from '@tanstack/react-query';
import { getDepositWithdraw } from '../api/DepositWithdrowApi';

export const useDeposit = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['deposit', search, limit, page],
    queryFn: () => getDepositWithdraw({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('something went worng:', error);
    },
  });
};
