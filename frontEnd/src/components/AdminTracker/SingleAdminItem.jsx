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
      className="bg-gray-900 text-white border border-gray-700 rounded-xl p-6 shadow-lg relative"
    >
      {/* Top Section - Order ID, Status, and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Left Side - Order Info */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Status</span>
            <span className={`${statusColors[order.status]} px-3 py-1 rounded-md text-sm font-medium mt-1`}>
              {order.status}
            </span>
          </div>
          <div className="h-10 w-px bg-gray-700" /> {/* Vertical Divider */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">{order._id}</span>
            <span className="text-sm text-gray-400 mt-1">Order ID</span>
          </div>
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-3">
          <select
            onChange={(e) => {
              const selectedAction = statusActions[order.status].find((action) => action.name.includes(e.target.value));
              if (selectedAction) selectedAction({ orderId: order._id }).then(onStatusChange);
            }}
            className="min-w-[140px] border border-gray-600 rounded-lg px-4 py-2 bg-gray-800 text-sm text-white shadow-sm focus:outline-none hover:bg-gray-750"
          >
            <option value="">Update Status</option>
            {statusActions[order.status].map((action, index) => (
              <option key={index} value={action.name}>{action.name.replace("mark", "")}</option>
            ))}
          </select>
          <button
            onClick={handleSeeDetails}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-sm font-medium rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : (
              showDetails ? 'Hide Details' : 'View Details'
            )}
          </button>
        </div>
      </div>

      {/* Customer Info Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4 bg-gray-800/50 rounded-lg mb-6">
        <div>
          <span className="text-sm text-gray-400 block mb-1">Customer</span>
          <span className="font-medium">{order.name}</span>
        </div>
        <div>
          <span className="text-sm text-gray-400 block mb-1">Contact</span>
          <span className="font-medium">{order.contactNo}</span>
        </div>
        <div>
          <span className="text-sm text-gray-400 block mb-1">Amount</span>
          <span className="font-medium text-green-400">${order.total}</span>
        </div>
        <div>
          <span className="text-sm text-gray-400 block mb-1">Date</span>
          <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Expandable Details */}
      {showDetails && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Order Items */}
          <div>
            <h4 className="text-lg font-medium mb-4">Order Items</h4>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-semibold">{item.quantity}x</span>
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-400">${item.price} per item</p>
                    </div>
                  </div>
                  <p className="font-medium text-lg">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-800 rounded-lg">
              <h4 className="text-lg font-medium mb-4">Delivery Details</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="font-medium mt-1">{order.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium mt-1">{order.email}</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-medium mb-4">Actions</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Manage this order or remove it from the system
                </p>
              </div>
              <button
                onClick={deleteSingleOrder}
                disabled={isDeleting}
                className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete Order"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SingleAdminItem;