import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../server';
import { get_data } from '../../services/data_requests/get_data_request';
import SingleAdminItem from './SingleAdminItem';
import Spinner from '../Spinner';
import { FaClock, FaEye, FaFilter, FaSearch, FaSort } from 'react-icons/fa';

function AdminPending() {
  const [orderGroup, setOrderGroup] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const fetchPendingData = async () => {
    setLoading(true);
    try {
      const response = await get_data(`${backendUrl}/api/v1/adminPending`);
      const orderItems = response.data;
      setOrderGroup(orderItems);
      setFilteredOrders(orderItems);
    } catch (error) {
      console.error('Error fetching pending orders:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingData();
  }, []);

  // Filter and sort orders
  useEffect(() => {
    let filtered = orderGroup.filter(order => 
      order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.contactNo?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'amount-high':
          return (parseFloat(b.total) || 0) - (parseFloat(a.total) || 0);
        case 'amount-low':
          return (parseFloat(a.total) || 0) - (parseFloat(b.total) || 0);
        default:
          return 0;
      }
    });

    setFilteredOrders(filtered);
  }, [orderGroup, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="text-center">
          <Spinner type="diamond" text="Loading pending orders..." />
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
            All orders have been processed! Check back later for new orders requiring review.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaClock className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Pending Orders</h1>
                <p className="text-gray-600">Orders awaiting review and approval</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-2 bg-amber-100 px-3 py-2 rounded-full">
                <FaEye className="text-amber-600" />
                <span className="font-medium text-amber-800">{filteredOrders.length} orders pending</span>
              </span>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="card-luxury p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by customer name, order ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-luxury pl-10"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-2">
                <FaSort className="text-gray-400" />
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-700 font-medium focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none transition-all duration-300 cursor-pointer hover:border-gray-300 shadow-sm min-w-[180px]"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="amount-high">Amount: High to Low</option>
                    <option value="amount-low">Amount: Low to High</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {searchTerm ? 'Filtered Results' : 'Total Pending'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
                  {searchTerm && (
                    <p className="text-xs text-gray-500 mt-1">
                      of {orderGroup.length} total orders
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <FaClock className="text-amber-600 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Review Time</p>
                  <p className="text-2xl font-bold text-gray-900">1.5 days</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaEye className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="card-luxury p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {searchTerm ? 'Priority in Results' : 'Priority Orders'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredOrders.filter(order => order.priority === 'high').length || 0}
                  </p>
                  {searchTerm && (
                    <p className="text-xs text-gray-500 mt-1">
                      of {orderGroup.filter(order => order.priority === 'high').length || 0} total priority
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <FaFilter className="text-red-600 text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {filteredOrders.map((order) => (
              <div key={order.id || order._id} className="animate-fade-in">
                <SingleAdminItem
                  order={order}
                  onDelete={fetchPendingData}
                  onStatusChange={fetchPendingData}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPending;
