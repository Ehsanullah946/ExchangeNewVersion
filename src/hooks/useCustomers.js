import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCustomer,
  deleteCustomer,
  getAllTransaction,
  getCustomer,
  getSingleCustomer,
  updateCustomer,
} from '../api/customerApi';
export const useCustomers = (search = '', phone = '', limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['customers', search, phone, limit, page],
    queryFn: () => getCustomer({ search, phone, limit, page }),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.error('Error fetching customers:', error);
    },
  });
};

export const useSingleCustomer = (id) => {
  return useQuery({
    queryKey: ['customers', id],
    queryFn: () => getSingleCustomer(id),
    enabled: !!id,
    onError: (error) => {
      console.error('Error fetching customer by id:', error);
    },
  });
};

export const useAllTransaction = (customerId, limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['customers', customerId, limit, page],
    queryFn: () => getAllTransaction(customerId, { limit, page }),
    enabled: !!customerId,
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.error('Error fetching all transaction customer:', error);
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

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    },
  });
};
