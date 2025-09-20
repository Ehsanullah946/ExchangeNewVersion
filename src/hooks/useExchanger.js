import { useQuery } from '@tanstack/react-query';
import { getExchanger } from '../api/exchangerApi';

export const useExchanger = (search = '', phone = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['exchangers', search, phone, limit, page],
    queryFn: () => getExchanger({ search, phone, limit, page }),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    onError: (error) => {
      console.log('failed to fetch exchanger', error);
    },
  });
};
