// api/salaryApi.js
import axiosClient from './axiosClient';

export const getSalaries = async (filters = {}) => {
  const { data } = await axiosClient.get('/salary', { params: filters });
  return data;
};

export const getSalarySummary = async (period = 'month') => {
  const { data } = await axiosClient.get('/salary/summary', {
    params: { period },
  });
  return data;
};

export const getEmployeesForSalary = async () => {
  const { data } = await axiosClient.get('/salary/employees');
  return data;
};

export const createSalary = async (employeeId, salaryData) => {
  const { data } = await axiosClient.post(`/salary/${employeeId}`, salaryData);
  return data;
};

export const updateSalary = async (salaryId, updateData) => {
  const { data } = await axiosClient.put(`/salary/${salaryId}`, updateData);
  return data;
};

export const markSalaryAsPaid = async (salaryId, paymentDate) => {
  const { data } = await axiosClient.patch(`/salary/${salaryId}/pay`, {
    paymentDate,
  });
  return data;
};
