import React from 'react';
import { useTranslation } from 'react-i18next';

const PrintButton = ({
  onPrint,
  label = 'Print',
  icon = true,
  variant = 'default',
  disabled = false,
  className = '',
}) => {
  const { t } = useTranslation();

  const baseClasses =
    'flex items-center gap-2 px-3 py-1.5 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 text-sm';

  const variants = {
    default:
      'bg-gradient-to-r from-gray-600 to-slate-700 hover:from-gray-700 hover:to-slate-800 text-white',
    primary:
      'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white',
    success:
      'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white',
    danger:
      'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white',
  };

  return (
    <button
      onClick={onPrint}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {icon && (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
      )}
      <span>{t(label)}</span>
    </button>
  );
};

export default PrintButton;
