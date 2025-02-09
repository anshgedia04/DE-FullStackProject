import React, { useState } from 'react';
import { orderDelete } from '../../services/orderService/orderDelete';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 mb-3 bg-gray-900 text-white  rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-semibold">Order ID: <span className="text-gray-400">{item._id}</span></h2>
          <span className="text-sm text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
        <span className={`px-4 py-2 rounded-lg text-sm font-medium ${statusColors[item.status] || 'bg-gray-500'}`}>
          {item.status.toUpperCase()}
        </span>
      </div>

      <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-md">
        {item.items.map((product) => (
          <div key={product.id} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-0">
            <div className="flex-1">
              <p className="text-lg font-medium text-gray-300">{product.title}</p>
            </div>
            <div className="w-24 text-center text-gray-400">Qty: {product.quantity}</div>
            <div className="w-24 text-right text-gray-100 font-semibold">${product.price}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        {item.status === 'pending' && (
          <button
            onClick={deleteSingleOrder}
            disabled={isDeleting}
            className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete Order'}
          </button>
        )}
        <span className="text-2xl font-bold text-gray-100 ml-auto">Total: ${item.total}</span>
      </div>
    </motion.div>
  );
}

export default SingleItem;