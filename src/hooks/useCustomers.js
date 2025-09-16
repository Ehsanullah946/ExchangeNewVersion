import { useQuery } from '@tanstack/react-query';
import { getCustomer } from '../api/customerApi';
export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: getCustomer,
    staleTime: 1000 * 60 * 5,
  });
};
