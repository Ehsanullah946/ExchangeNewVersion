import { useQuery } from '@tanstack/react-query';
import { getTransfer } from '../api/transferApi';

export const useTransfer = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['transfer', search, limit, page],
    queryFn: () => getTransfer({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.error('Error fetching transfer:', error);
    },
  });
};
