import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { get_data } from '../../services/data_requests/get_data_request';
import { backendUrl } from '../../server';
import Spinner from '../Spinner';
import SingleItem from './SingleItem';
import { FaTruck, FaShippingFast, FaClock } from 'react-icons/fa';

function ClientDispatch() {
    const [orderGroup, setOrderGroup] = useState([]);
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => state.auth)
    const userId = user._id
    
    const dispatchData = async () => {
      setLoading(true);
      try {
        const order = await get_data(`${backendUrl}/api/v1/dispatch/${userId}`);
        const orderItems = order.data; 
        setOrderGroup(orderItems);
      } catch (error) {
        console.error("Error fetching dispatched orders:", error.message);
      }
      setLoading(false);
    }
    
    useEffect(() => {
        dispatchData();
    },[])

    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
          <div className="text-center">
            <Spinner type="diamond" text="Loading your dispatched orders..." />
          </div>
        </div>
      );
    }
    
    if (!orderGroup || orderGroup.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center px-4">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
              <FaTruck className="text-4xl text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Dispatched Orders</h2>
            <p className="text-gray-600 mb-8">
              You don't have any orders currently in transit. Once your orders are dispatched, you'll be able to track them here.
            </p>
            <button 
              onClick={() => window.history.back()}
              className="btn-primary"
            >
              Go Back
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
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FaTruck className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dispatched Orders</h1>
                <p className="text-gray-600">Your orders currently in transit</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-2">
                <FaShippingFast className="text-purple-500" />
                <span>{orderGroup.length} order{orderGroup.length !== 1 ? 's' : ''} in transit</span>
              </span>
              <span className="flex items-center space-x-2">
                <FaClock className="text-gray-400" />
                <span>Estimated delivery: 2-5 business days</span>
              </span>
            </div>
          </div>

          {/* Orders Grid */}
          <div className="space-y-6">
            {orderGroup.map(order => (
              <div key={order._id?.$oid || order._id} className="animate-fade-in">
                <SingleItem item={order} />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}

export default ClientDispatch