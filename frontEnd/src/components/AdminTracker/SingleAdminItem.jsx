import React, { useEffect, useState, useRef } from "react";
import { orderDelete } from "../../services/orderService/orderDelete";
import { useSelector } from "react-redux";
import { markDelivered, markDispatched, markPending, markReviewed } from "../../services/orderService/mark";
import { motion } from "framer-motion";

const SingleAdminItem = ({ order, onDelete, onStatusChange }) => {
  // Simplified state management
  const [uiState, setUiState] = useState({
    isLoading: false,
    isDetailsVisible: false,
    isDeleting: false,
    isStatusModalOpen: false,
    isDropdownOpen: false
  });
  
  const dropdownRef = useRef(null);

  // Status transition map - defines valid status transitions
  const statusTransitions = {
    pending: { next: 'reviewed', alternate: 'dispatched' },
    reviewed: { next: 'dispatched', alternate: 'pending' },
    dispatched: { next: 'delivered', alternate: 'reviewed' },
    delivered: { next: 'reviewed', alternate: 'dispatched' }
  };

  // Status action map - maps status transitions to API calls
  const getStatusActions = (currentStatus) => {
    const transitions = statusTransitions[currentStatus];
    return [
      { label: transitions.next, action: getMarkFunction(transitions.next) },
      { label: transitions.alternate, action: getMarkFunction(transitions.alternate) }
    ];
  };

  // Helper to get the appropriate mark function
  const getMarkFunction = (status) => {
    const markFunctions = {
      pending: markPending,
      reviewed: markReviewed,
      dispatched: markDispatched,
      delivered: markDelivered
    };
    return markFunctions[status];
  };

  // Unified state update function
  const updateUiState = (updates) => {
    setUiState(prev => ({ ...prev, ...updates }));
  };

  // Handle status change
  const handleStatusChange = async (actionFn) => {
    try {
      await actionFn({ orderId: order._id });
      await onStatusChange();
      updateUiState({ isStatusModalOpen: false, isDropdownOpen: false });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle order deletion
  const handleDeleteOrder = async () => {
    updateUiState({ isDeleting: true });
    try {
      await orderDelete({ userId: order.userId, orderId: order._id });
      await onDelete();
    } catch (error) {
      console.error("Error deleting order:", error);
    } finally {
      updateUiState({ isDeleting: false });
    }
  };

  // Handle details toggle with loading simulation
  const handleDetailsToggle = () => {
    updateUiState({ isLoading: true });
    setTimeout(() => {
      updateUiState({
        isLoading: false,
        isDetailsVisible: !uiState.isDetailsVisible
      });
    }, 1000);
  };

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        updateUiState({ isDropdownOpen: false });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusColors = {
    pending: "bg-red-600 text-white",
    reviewed: "bg-yellow-500 text-white",
    dispatched: "bg-blue-500 text-white",
    delivered: "bg-green-500 text-white",
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
          {/* Desktop View - Dropdown */}
          <div className="hidden md:block relative" ref={dropdownRef}>
            <button
              onClick={() => updateUiState({ isDropdownOpen: !uiState.isDropdownOpen })}
              className="px-3 py-2 bg-gray-700 text-sm font-medium rounded-lg hover:bg-gray-600 transition"
            >
              Update Status
            </button>

            {uiState.isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-50">
                {getStatusActions(order.status).map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleStatusChange(action.action);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {action.label.replace("mark", "")}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile View - Single Update Status Button */}
          <div className="md:hidden">
            <button
              onClick={() => updateUiState({ isStatusModalOpen: true })}
              className="px-3 py-2 bg-gray-700 text-sm font-medium rounded-lg hover:bg-gray-600 transition"
            >
              Update Status
            </button>

            {/* Mobile Status Modal */}
            {uiState.isStatusModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-800 rounded-lg p-4 w-[90%] max-w-sm">
                  <h3 className="text-lg font-medium mb-4">Update Status</h3>
                  <div className="flex flex-col gap-2">
                    {getStatusActions(order.status).map((action, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleStatusChange(action.action);
                        }}
                        className="px-3 py-2 bg-gray-700 text-sm font-medium rounded-lg hover:bg-gray-600 transition text-left"
                      >
                        {action.label.replace("mark", "")}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => updateUiState({ isStatusModalOpen: false })}
                    className="w-full mt-4 px-3 py-2 bg-gray-700 text-sm font-medium rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleDetailsToggle}
            disabled={uiState.isLoading}
            className="px-4 py-2 bg-purple-600 text-sm font-medium rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
          >
            {uiState.isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </>
            ) : (
              uiState.isDetailsVisible ? 'Hide Details' : 'View Details'
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
      {uiState.isDetailsVisible && (
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
                onClick={handleDeleteOrder}
                disabled={uiState.isDeleting}
                className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {uiState.isDeleting ? "Deleting..." : "Delete Order"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SingleAdminItem;