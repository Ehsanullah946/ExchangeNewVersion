// hooks/usePrint.js
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useTranslation } from 'react-i18next';

export const usePrint = (options = {}) => {
  const componentRef = useRef();
  const { t } = useTranslation();

  const {
    documentTitle = 'Document',
    pageStyle = '',
    onBeforeGetContent,
    onAfterPrint,
    removeAfterPrint = true,
  } = options;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle,
    pageStyle: `
      @media print {
        @page {
          size: A4;
          margin: 0.5in;
        }
        body {
          font-family: 'Arial', 'Helvetica', sans-serif;
          font-size: 12px;
          line-height: 1.4;
          color: #000;
        }
        .no-print {
          display: none !important;
        }
        .print-break-before {
          page-break-before: always;
        }
        .print-break-after {
          page-break-after: always;
        }
        .print-break-inside-avoid {
          page-break-inside: avoid;
        }
        .print-header {
          background-color: #f8f9fa !important;
          color: #000 !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .text-left { text-align: left; }
        .font-bold { font-weight: bold; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mt-4 { margin-top: 1rem; }
        .p-4 { padding: 1rem; }
        .border { border: 1px solid #ddd; }
        .rounded { border-radius: 0.25rem; }
        ${pageStyle}
      }
    `,
    onBeforeGetContent,
    onAfterPrint: () => {
      if (removeAfterPrint && componentRef.current) {
        componentRef.current = null;
      }
      onAfterPrint?.();
    },
  });

  return {
    componentRef,
    handlePrint,
    PrintContainer: ({ children, className = '' }) => (
      <div style={{ display: 'none' }}>
        <div ref={componentRef} className={`print-container ${className}`}>
          {children}
        </div>
      </div>
    ),
  };
};
