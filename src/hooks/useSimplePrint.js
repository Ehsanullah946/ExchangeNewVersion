import { useTranslation } from 'react-i18next';

export const useSimplePrint = () => {
  const { t } = useTranslation();

  const printContent = (content, title = 'Document') => {
    const printWindow = window.open('', '_blank', 'width=1000,height=700');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            @page { 
              size: A4 landscape; 
              margin: 0.5in; 
            }
            body { 
              font-family: 'Arial', 'Helvetica', sans-serif; 
              font-size: 12px; 
              line-height: 1.4;
              color: #000;
              margin: 0;
              padding: 20px;
            }
            .print-header {
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 2px solid #333;
            }
            .print-header h1 {
              margin: 0 0 10px 0;
              font-size: 24px;
              color: #333;
            }
            .print-meta {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              font-size: 11px;
              color: #666;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
            }
            th {
              background-color: #f8f9fa;
              border: 1px solid #dee2e6;
              padding: 10px 8px;
              text-align: left;
              font-weight: bold;
              color: #333;
            }
            td {
              border: 1px solid #dee2e6;
              padding: 8px;
              vertical-align: top;
            }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .text-left { text-align: left; }
            .summary-card {
              border: 1px solid #dee2e6;
              border-radius: 4px;
              padding: 12px;
              margin-bottom: 15px;
              background-color: #f8f9fa;
            }
            .negative { color: #dc3545; }
            .positive { color: #28a745; }
            .print-footer {
              margin-top: 30px;
              padding-top: 15px;
              border-top: 1px solid #dee2e6;
              font-size: 10px;
              color: #6c757d;
              text-align: center;
            }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);

    printWindow.document.close();

    // Wait for content to load before printing
    setTimeout(() => {
      printWindow.print();
      // Optional: Close window after print
      // setTimeout(() => printWindow.close(), 1000);
    }, 500);
  };

  return { printContent };
};
