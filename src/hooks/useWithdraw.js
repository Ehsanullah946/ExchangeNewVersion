import { useQuery } from '@tanstack/react-query';
import { getWithdraw } from '../api/DepositWithdrowApi';

export const useWithdraw = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['withdraw', search, limit, page],
    queryFn: () => getWithdraw({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('something went worng:', error);
    },
  });
};
