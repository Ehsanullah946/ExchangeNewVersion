import { useQuery } from '@tanstack/react-query';
import { getConsumption } from '../api/consumptionApi';

export const useConsumption = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['consumption', search, limit, page],
    queryFn: () => getConsumption({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('Error fetching consumption', error);
    },
  });
};
