import { jsPDF } from 'jspdf';
import React from 'react';

export default function InvoiceAndQR({ bookingId }: { bookingId: string }) {
  const downloadInvoice = () => {
    const doc = new jsPDF();
    doc.text(`Invoice for Booking: ${bookingId}`, 10, 10);
    doc.save('invoice.pdf');
  };

  const qrSize = 200;
  const qrValue = encodeURIComponent(bookingId);
  const qrSrc = `https://chart.googleapis.com/chart?cht=qr&chs=${qrSize}x${qrSize}&chl=${qrValue}`;

  return (
    <div>
      <img src={qrSrc} alt={`QR for ${bookingId}`} width={qrSize} height={qrSize} />
      <button onClick={downloadInvoice}>Download Invoice</button>
    </div>
  );
}