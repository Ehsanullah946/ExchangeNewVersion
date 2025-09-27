import { useQuery } from '@tanstack/react-query';
import { getTransferToAccount } from '../api/transferToAccount';

export const useTransferToAccount = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['transferToAccount', search, limit, page],
    queryFn: () => getTransferToAccount({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('failed to fetch transferToAccount', error);
    },
  });
};
