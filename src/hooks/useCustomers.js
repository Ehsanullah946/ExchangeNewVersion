import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCustomer, getCustomer } from '../api/customerApi';
export const useCustomers = (search = '', phone = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['customers', search, phone, limit, page],
    queryFn: () => getCustomer({ search, phone, limit, page }),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
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
