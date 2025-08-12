import React, { useEffect, useState } from 'react';
import { get_data } from '../../services/data_requests/get_data_request';
import { backendUrl } from '../../server';
import { useSelector } from 'react-redux';
import SingleItem from './SingleItem';
import Spinner from '../Spinner';
import { FaClock, FaEye, FaHourglassHalf } from 'react-icons/fa';

function ClientPending() {
  const [orderGroup, setOrderGroup] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  const pendingData = async () => {
    setLoading(true);
    try {
      const response = await get_data(`${backendUrl}/api/v1/getPendingReviewed/${userId}`);
      const orderItems = response.data; 
      setOrderGroup(orderItems);
    } catch (error) {
      console.error("Error fetching pending orders:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    pendingData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="text-center">
          <Spinner type="diamond" text="Loading your pending orders..." />
        </div>
      </div>
    );
  }

  if (!orderGroup || orderGroup.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
            <FaClock className="text-4xl text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Pending Orders</h2>
          <p className="text-gray-600 mb-8">
            You don't have any pending orders at the moment. Start shopping for exquisite diamonds to see your orders here.
          </p>
          <button 
            onClick={() => window.history.back()}
            className="btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <FaClock className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pending Orders</h1>
              <p className="text-gray-600">Orders awaiting review and processing</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-2">
              <FaHourglassHalf className="text-amber-500" />
              <span>{orderGroup.length} order{orderGroup.length !== 1 ? 's' : ''} pending</span>
            </span>
            <span className="flex items-center space-x-2">
              <FaEye className="text-gray-400" />
              <span>Review time: 1-2 business days</span>
            </span>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
          <div className="flex items-start space-x-3">
            <FaClock className="text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">Order Review Process</h3>
              <p className="text-amber-800 text-sm">
                Your diamond orders are being carefully reviewed by our experts to ensure authenticity and quality. 
                You'll receive an update once the review is complete.
              </p>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="space-y-6">
          {orderGroup.map(order => (
            <div key={order._id?.$oid || order._id} className="animate-fade-in">
              <SingleItem item={order} onDelete={pendingData} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientPending;
