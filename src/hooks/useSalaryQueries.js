import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSalaries,
  getSalarySummary,
  getEmployeesForSalary,
  createSalary,
  updateSalary,
  markSalaryAsPaid,
} from '../api/salaryApi';

export const salaryKeys = {
  all: ['salary'],
  lists: () => [...salaryKeys.all, 'list'],
  list: (filters) => [...salaryKeys.lists(), filters],
  details: () => [...salaryKeys.all, 'detail'],
  detail: (id) => [...salaryKeys.details(), id],
  summary: () => [...salaryKeys.all, 'summary'],
  employees: () => [...salaryKeys.all, 'employees'],
};

// Queries
export const useSalaries = (filters = {}) => {
  return useQuery({
    queryKey: salaryKeys.list(filters),
    queryFn: () => getSalaries(filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSalarySummary = (period = 'month') => {
  return useQuery({
    queryKey: [...salaryKeys.summary(), period],
    queryFn: () => getSalarySummary(period),
    staleTime: 5 * 60 * 1000,
  });
};

export const useEmployeesForSalary = () => {
  return useQuery({
    queryKey: salaryKeys.employees(),
    queryFn: getEmployeesForSalary,
    staleTime: 10 * 60 * 1000,
  });
};

// Mutations
export const useCreateSalary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ employeeId, salaryData }) =>
      createSalary(employeeId, salaryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salaryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: salaryKeys.summary() });
    },
  });
};

export const useUpdateSalary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ salaryId, updateData }) =>
      updateSalary(salaryId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salaryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: salaryKeys.summary() });
    },
  });
};

export const useMarkSalaryAsPaid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ salaryId, paymentDate }) =>
      markSalaryAsPaid(salaryId, paymentDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: salaryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: salaryKeys.summary() });
    },
  });
};
