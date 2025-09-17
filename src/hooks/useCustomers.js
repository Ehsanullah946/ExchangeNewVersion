import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCustomer, getCustomer } from '../api/customerApi';
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

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    },
  });
};
