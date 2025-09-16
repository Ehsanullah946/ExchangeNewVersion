import { useQuery } from '@tanstack/react-query';
import { getCustomer } from '../api/customerApi';

export const useCustomers = (search = '', phone = '') => {
  return useQuery({
    queryKey: ['customers', search, phone],
    queryFn: () => getCustomer({ search, phone }),
    staleTime: 1000 * 60 * 5,
    onError: (error) => {
      console.error('Error fetching customers:', error);
    },
  });
};
