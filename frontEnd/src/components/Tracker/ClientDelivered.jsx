import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { get_data } from '../../services/data_requests/get_data_request';
import { backendUrl } from '../../server';
import SingleItem from './SingleItem';
import Spinner from '../Spinner';
import { FaCheckCircle, FaBox } from 'react-icons/fa';

function ClientDelivered() {
    const [orderGroup, setOrderGroup] = useState([]);
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => state.auth)
    const userId = user._id
    
    const deliveredData = async () => {
      setLoading(true);
      try {
        const order = await get_data(`${backendUrl}/api/v1/delivered/${userId}`);
        const orderItems = order.data; 
        setOrderGroup(orderItems); 
      } catch (error) {
        console.error("Error fetching delivered orders:", error.message);
      }
      setLoading(false);
    }
    
    useEffect(() => {
        deliveredData();
    },[])
    
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
          <div className="text-center">
            <Spinner type="diamond" text="Loading your delivered orders..." />
          </div>
        </div>
      );
    }
    
    if (!orderGroup || orderGroup.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center px-4">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-4xl text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Delivered Orders</h2>
            <p className="text-gray-600 mb-8">
              You haven't received any orders yet. Once your orders are delivered, they'll appear here.
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
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Delivered Orders</h1>
                <p className="text-gray-600">Your completed diamond orders</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-2">
                <FaBox className="text-green-500" />
                <span>{orderGroup.length} order{orderGroup.length !== 1 ? 's' : ''} delivered</span>
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

export default ClientDelivered