"use client";
import jsPDF from 'jspdf';

export default function InvoiceButton({ bookingData }: { bookingData: any }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`Invoice for: ${bookingData.serviceName}`, 10, 10);
    doc.text(`Date: ${bookingData.date}`, 10, 20);
    doc.save("invoice.pdf");
  };

  return <button onClick={generatePDF} className="bg-purple-600 text-white p-2">Download Invoice</button>;
}