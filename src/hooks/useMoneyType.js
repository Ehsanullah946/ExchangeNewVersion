import { useQuery } from '@tanstack/react-query';
import { getMoneyType } from '../api/moneyTypeApi';

export const useMoneyType = (search = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['moneyType', search, limit, page],
    queryFn: () => getMoneyType({ search, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.log('failed to fetch exchanger', error);
    },
  });
};
