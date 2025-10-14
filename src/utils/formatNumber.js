// utils/formatNumber.js
export const formatNumber = (number, options = {}) => {
  if (number === null || number === undefined || number === '') return '0';

  const num = typeof number === 'string' ? parseFloat(number) : number;

  if (isNaN(num)) return '0';

  // Check if it's a whole number
  if (Number.isInteger(num)) {
    return num.toLocaleString('en-US'); // Format with commas, no decimals
  }

  // For decimal numbers, show up to 2 decimal places
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  });
};

// Alternative more explicit version:
export const formatAmount = (amount) => {
  if (amount === null || amount === undefined || amount === '') return '0';

  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (isNaN(num)) return '0';

  // Remove trailing .00
  const formatted = num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatted.replace(/\.00$/, '');
};
