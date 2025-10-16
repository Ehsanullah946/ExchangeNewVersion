import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCustomer,
  deleteCustomer,
  getAllTransaction,
  getCustomer,
  getSingleCustomer,
  liquidateCustomer,
  updateCustomer,
} from '../api/customerApi';
import toast from 'react-hot-toast';
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

export const useCustomerAccount = (customerId) => {
  return useQuery({
    queryKey: ['customers', customerId],
    queryFn: () => getSingleCustomer(customerId),
    enabled: !!customerId,
    onError: (error) => {
      console.error('Error fetching customer by id:', error);
    },
  });
};

export const useLiquidateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      customerId,
      startDate,
      endDate,
      closeAccounts,
      description,
    }) =>
      liquidateCustomer(customerId, {
        startDate,
        endDate,
        closeAccounts,
        description,
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([
        'customers',
        variables.customerId,
        'transactions',
      ]);
      queryClient.invalidateQueries(['customers', variables.customerId]);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Liquidation failed');
    },
  });
};

export const useCustomerDetails = (customerId) => {
  return useQuery({
    queryKey: ['customers', customerId],
    queryFn: () => getSingleCustomer(customerId),
    enabled: !!customerId,
    onError: (error) => {
      console.error('Error fetching customer by id:', error);
    },
  });
};

export const useAllTransaction = (customerId, limit = 10, page = 1) => {
  return useQuery({
    queryKey: ['customers', customerId, 'transactions', limit, page],
    queryFn: () => {
      if (!customerId) {
        console.error('No customerId provided to useAllTransaction');
        return Promise.resolve({ data: [], total: 0 });
      }
      return getAllTransaction(customerId, { limit, page });
    },
    enabled: !!customerId && !isNaN(customerId),
    staleTime: 0,
    refetchOnMount: 'always',
    keepPreviousData: true,
    onError: (error) => {
      console.error('Error fetching all transaction customer:', error);
    },
    onSuccess: (data) => {
      console.log('Query successful - data received:', data);
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
