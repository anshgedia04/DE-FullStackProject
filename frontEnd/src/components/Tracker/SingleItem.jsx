import React, { useState } from 'react';
import { orderDelete } from '../../services/orderService/orderDelete';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function SingleItem({ item, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const statusColors = {
    pending: 'bg-red-500',
    reviewed: 'bg-green-500',
    dispatched: 'bg-yellow-500',
    delivered: 'bg-blue-500',
  };

  const deleteSingleOrder = async () => {
    setIsDeleting(true);
    try {
      await orderDelete({ userId: user._id, orderId: item._id });
      onDelete();
    } catch (error) {
      console.error('Error deleting order:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const generateBill = () => {
    // Initialize PDF document
    const doc = new jsPDF();
    
    // Add company logo/header with enhanced styling
    doc.setDrawColor(41, 128, 185); // Professional blue color
    doc.setLineWidth(0.8);
    doc.rect(10, 5, 190, 30);
    
    doc.setFontSize(24);
    doc.setTextColor(41, 128, 185);
    doc.text("Blue Diamonds", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("Pvt. Ltd.", 105, 28, { align: "center" });
    
    // Add invoice title with gradient-like effect
    doc.setFillColor(41, 128, 185);
    doc.rect(10, 40, 190, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("INVOICE", 105, 48, { align: "center" });
    
    // Add order details with modern box styling
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(249, 249, 249);
    doc.rect(10, 60, 90, 35, 'FD');
    
    doc.setFontSize(11);
    doc.setTextColor(41, 128, 185);
    doc.text("Order Details", 15, 70);
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.text(`Order ID: ${item._id}`, 15, 78);
    doc.text(`Date: ${item.createdAt}`, 15, 86);
    doc.text(`Status: ${item.status.toUpperCase()}`, 15, 94);
    
    // Add customer details with matching styling
    doc.setFillColor(249, 249, 249);
    doc.rect(110, 60, 90, 35, 'FD');
    
    doc.setTextColor(41, 128, 185);
    doc.setFontSize(11);
    doc.text("Bill To", 115, 70);
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.text(item.name || "Customer", 115, 78);
    doc.text(item.email || "", 115, 86);
    
    // Enhanced table styling
    const tableColumn = ["Item", "Quantity", "Price", "Total"];
    const tableRows = item.items.map(product => [
      product.title,
      product.quantity,
      `$${product.price}`,
      `$${(product.quantity * product.price).toFixed(2)}`
    ]);
    
    doc.autoTable({
      startY: 105,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 11,
        halign: 'center',
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 10,
        halign: 'center',
        textColor: [60, 60, 60]
      },
      alternateRowStyles: {
        fillColor: [249, 249, 249]
      },
      margin: { left: 10, right: 10 },
      styles: {
        cellPadding: 6,
        lineColor: [200, 200, 200],
        lineWidth: 0.1
      }
    });
    
    // Improved total amount section
    const finalY = doc.lastAutoTable.finalY || 105;
    doc.setFillColor(41, 128, 185);
    doc.rect(130, finalY + 10, 70, 20, 'F');
    
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(`Total Amount: $${item.total}`, 190, finalY + 23, { align: "right" });
    
    // Enhanced footer
    doc.setDrawColor(41, 128, 185);
    doc.setLineWidth(0.5);
    doc.line(10, finalY + 40, 200, finalY + 40);
    
    doc.setFontSize(10);
    doc.setTextColor(41, 128, 185);
    doc.text("Thank you for your business!", 105, finalY + 50, { align: "center" });
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("For any queries, please contact:", 105, finalY + 58, { align: "center" });
    doc.text("team.management.bluediamonds@gmail.com", 105, finalY + 65, { align: "center" });
    
    // Save the PDF
    doc.save(`invoice-${item._id}.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 sm:p-6 mb-3 bg-gray-900 text-white rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold break-all">Order ID: <span className="text-gray-400">{item._id}</span></h2>
          <span className="text-sm text-gray-400">{item.createdAt}</span>
        </div>
        <span className={`px-4 py-2 rounded-lg text-sm font-medium self-start md:self-center ${statusColors[item.status] || 'bg-gray-500'}`}>
          {item.status.toUpperCase()}
        </span>
      </div>

      <div className="mt-4 p-3 sm:p-4 bg-gray-800 rounded-lg shadow-md">
        {item.items.map((product) => (
          <div key={product.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-700 last:border-0 gap-2">
            <div className="flex-1">
              <p className="text-base sm:text-lg font-medium text-gray-300">{product.title}</p>
            </div>
            <div className="flex justify-between sm:justify-end items-center w-full sm:w-auto gap-4">
              <div className="text-gray-400">Qty: {product.quantity}</div>
              <div className="text-gray-100 font-semibold">${product.price}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col-reverse sm:flex-row justify-between items-center gap-3">
        {item.status === 'pending' && (
          <button
            onClick={deleteSingleOrder}
            disabled={isDeleting}
            className="w-full sm:w-auto px-5 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete Order'}
          </button>
        )}
        <div className="flex flex-col-reverse sm:flex-row sm:ml-auto items-center gap-3 sm:gap-8">
          {item.status === 'delivered' && (
            <button
              onClick={generateBill}
              className="w-full sm:w-auto px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
            >
              GET Bill
            </button>
          )}
          <span className="text-xl sm:text-2xl font-bold text-gray-100">Total: ${item.total}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default SingleItem;