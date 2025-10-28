// hooks/useFlexiblePrint.js
import { useTranslation } from 'react-i18next';

export const useFlexiblePrint = () => {
  const { t } = useTranslation();

  const printContent = (content, options = {}) => {
    const {
      title = 'Document',
      paperSize = 'A4', // 'A4', 'A4-landscape', '80mm', '58mm'
      orientation = 'portrait',
    } = options;

    const printWindow = window.open('', '_blank', 'width=800,height=600');

    // Paper size configurations
    const paperConfigs = {
      A4: {
        pageSize: 'A4',
        pageMargin: '0.5in',
        bodyPadding: '20px',
        fontSize: '12px',
      },
      'A4-landscape': {
        pageSize: 'A4 landscape',
        pageMargin: '0.5in',
        bodyPadding: '20px',
        fontSize: '12px',
      },
      '80mm': {
        pageSize: '80mm',
        pageMargin: '0',
        bodyPadding: '5px',
        fontSize: '10px',
      },
      '58mm': {
        pageSize: '58mm',
        pageMargin: '0',
        bodyPadding: '3px',
        fontSize: '9px',
      },
    };

    const config = paperConfigs[paperSize] || paperConfigs['A4'];

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            @page { 
              size: ${config.pageSize}; 
              margin: ${config.pageMargin}; 
            }
            body { 
              font-family: 'Courier New', monospace; 
              font-size: ${config.fontSize}; 
              line-height: 1.2;
              color: #000;
              margin: 0;
              padding: ${config.bodyPadding};
              width: ${paperSize.includes('mm') ? paperSize : 'auto'};
              ${paperSize.includes('mm') ? 'margin: 0 auto;' : ''}
            }
            .no-print { display: none; }
            
            /* Thermal printer specific styles */
            .thermal-receipt {
              font-family: 'Courier New', monospace !important;
              font-size: 10px !important;
              width: 80mm !important;
              padding: 5px !important;
              line-height: 1.2 !important;
              margin: 0 auto !important;
            }
            
            .receipt-header {
              text-align: center;
              margin-bottom: 8px;
              border-bottom: 1px dashed #000;
              padding-bottom: 5px;
            }
            
            .receipt-section {
              margin-bottom: 8px;
            }
            
            .receipt-divider {
              border-top: 1px dashed #000;
              margin: 5px 0;
              padding-top: 5px;
            }
            
            .receipt-footer {
              border-top: 1px dashed #000;
              margin-top: 8px;
              padding-top: 5px;
              text-align: center;
              font-size: 9px;
            }
            
            .cut-line {
              text-align: center;
              margin-top: 10px;
              border-top: 1px dashed #000;
              padding-top: 5px;
            }

            @media print {
              body { 
                padding: 0 !important;
                margin: 0 !important;
              }
              .no-print { display: none !important; }
              
              ${
                paperSize.includes('mm')
                  ? `
                @page {
                  size: ${paperSize};
                  margin: 0;
                  padding: 0;
                }
                body {
                  width: ${paperSize} !important;
                  font-family: 'Courier New', monospace !important;
                  font-size: ${config.fontSize} !important;
                  margin: 0 auto !important;
                  padding: ${config.bodyPadding} !important;
                }
              `
                  : ''
              }
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
      // Auto-close after printing (optional)
      setTimeout(() => printWindow.close(), 1000);
    }, 500);
  };

  return { printContent };
};
