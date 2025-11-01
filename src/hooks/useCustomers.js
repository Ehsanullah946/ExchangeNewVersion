import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCustomer,
  deleteCustomer,
  deleteLiquidation,
  getAllTransaction,
  getCustomer,
  getCustomerLiquidations,
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

// getting  the liquidations of a customer
export const useCustomerLiquidations = (customerId) => {
  return useQuery({
    queryKey: ['customers', customerId, 'liquidations'],
    queryFn: () => getCustomerLiquidations(customerId),
    enabled: !!customerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// use delete liquidation

export const useDeleteLiquidation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (liquidationId) => deleteLiquidation(liquidationId),
    onSuccess: (data, variables) => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries(['customers', 'liquidations']);
      queryClient.invalidateQueries(['customers']); // Refresh transactions

      // Show success message
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || 'Failed to delete liquidation'
      );
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

export const useAllTransaction = (
  customerId,
  limit = 10,
  page = 1,
  search,
  moneyType,
  fromDate,
  toDate,
  TransactionType
) => {
  return useQuery({
    queryKey: [
      'customer-transactions',
      customerId,
      limit,
      page,
      search,
      moneyType,
      fromDate,
      toDate,
      TransactionType,
    ],
    queryFn: () => {
      if (!customerId) {
        console.error('❌ No customerId provided to useAllTransaction');
        throw new Error('Customer ID is required');
      }

      return getAllTransaction(customerId, {
        limit,
        page,
        search: search || '',
        moneyType: moneyType || '',
        fromDate: fromDate || '',
        toDate: toDate || '',
        TransactionType: TransactionType || '',
      });
    },
    enabled: !!customerId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    onError: (error) => {
      console.error('Error fetching customer transactions:', error);
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
