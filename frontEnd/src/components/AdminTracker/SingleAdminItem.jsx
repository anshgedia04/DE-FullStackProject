import React, { useEffect, useState } from "react";
import { orderDelete } from "../../services/orderService/orderDelete";
import { useSelector } from "react-redux";
import { markDelivered, markDispatched, markPending, markReviewed } from "../../services/orderService/mark";
import { motion } from "framer-motion";

const SingleAdminItem = ({ order, onDelete, onStatusChange }) => {
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleSeeDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowDetails(!showDetails);
    }, 1000);
  };

  const statusColors = {
    pending: "bg-red-600 text-white",
    reviewed: "bg-yellow-500 text-white",
    dispatched: "bg-blue-500 text-white",
    delivered: "bg-green-500 text-white",
  };

  const deleteSingleOrder = async () => {
    setIsDeleting(true);
    try {
      await orderDelete({ userId: order.userId, orderId: order._id });
      onDelete();
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const statusActions = {
    pending: [markReviewed, markDispatched],
    reviewed: [markPending, markDispatched],
    dispatched: [markReviewed, markDelivered],
    delivered: [markReviewed, markDispatched],
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-900 text-white border border-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">
            Order ID: <span className="bg-gray-700 px-2 py-1 rounded-md">{order._id}</span>
          </h2>
          <p className="text-gray-400">Name: {order.name}</p>
          <p className="text-gray-400">Total: ${order.total}</p>
          <p className="text-gray-400">Created At: {order.createdAt}</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            onChange={(e) => {
              const selectedAction = statusActions[order.status].find((action) => action.name.includes(e.target.value));
              if (selectedAction) selectedAction({ orderId: order._id }).then(onStatusChange);
            }}
            className="border border-gray-600 rounded-lg px-3 py-2 bg-gray-800 text-white shadow-sm focus:outline-none"
          >
            <option value="">Change Status</option>
            {statusActions[order.status].map((action, index) => (
              <option key={index} value={action.name}>{action.name.replace("mark", "")}</option>
            ))}
          </select>
          <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${statusColors[order.status]}`}>
            {order.status}
          </span>
          <button
            onClick={handleSeeDetails}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            See Details
          </button>
        </div>
      </div>

      {showDetails && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-sm"
        >
          <h3 className="text-lg font-semibold mb-2">Order Details</h3>
          <ul className="space-y-2">
            {order.items.map((item, index) => (
              <li key={index} className="text-gray-300">
                <strong>{item.title}</strong> - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-gray-400">Address: {order.address}</p>
            <p className="text-gray-400">Contact: {order.contactNo}</p>
            <p className="text-gray-400">Email: {order.email}</p>
          </div>
          <button
            onClick={deleteSingleOrder}
            disabled={isDeleting}
            className="px-5 py-2 mt-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Order"}
          </button>
        </motion.div>
      )}

      {loading && (
        <div className="mt-4 flex justify-center items-center">
          <div className="w-6 h-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </motion.div>
  );
};

export default SingleAdminItem;