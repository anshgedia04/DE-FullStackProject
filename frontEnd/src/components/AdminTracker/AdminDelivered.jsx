import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../server';
import { get_data } from '../../services/data_requests/get_data_request';
import SingleAdminItem from './SingleAdminItem';
import Spinner from '../Spinner';
import { FaCheckCircle, FaBox, FaSearch, FaSort, FaCalendarAlt, FaTimes } from 'react-icons/fa';

function AdminDelivered() {
  const [orderGroup, setOrderGroup] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [dateFilterActive, setDateFilterActive] = useState(false);

  const fetchDeliveredData = async () => {
    setLoading(true);
    try {
      const response = await get_data(`${backendUrl}/api/v1/adminDelivered`);
      const orderItems = response.data;
      setOrderGroup(orderItems);
      setFilteredOrders(orderItems);
    } catch (error) {
      console.error('Error fetching delivered orders:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveredData();
  }, []);

  // Filter and sort orders
  useEffect(() => {
    let filtered = orderGroup.filter(order => 
      order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.contactNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply date filter if active
    if (dateFilterActive && selectedDate) {
      filtered = filtered.filter(order => {
        // Try multiple date fields that might exist in the order
        const orderDateStr = order.deliveredAt || order.createdAt || order.date;
        
        if (!orderDateStr) return false;
        
        // Parse dd-mm-yyyy format correctly
        let orderDate;
        if (orderDateStr.includes('-')) {
          // Handle dd-mm-yyyy format (like "08-12-2025")
          const [day, month, year] = orderDateStr.split('-');
          orderDate = new Date(year, month - 1, day); // month - 1 because JS months are 0-indexed
        } else if (orderDateStr.includes('/')) {
          // Handle dd/mm/yyyy or mm/dd/yyyy format
          const parts = orderDateStr.split('/');
          if (parts[0] <= 12 && parts[1] > 12) {
            // Likely mm/dd/yyyy format
            orderDate = new Date(orderDateStr);
          } else {
            // Likely dd/mm/yyyy format
            const [day, month, year] = parts;
            orderDate = new Date(year, month - 1, day);
          }
        } else {
          // Fallback to default parsing
          orderDate = new Date(orderDateStr);
        }
        
        const filterDate = new Date(selectedDate);
        
        // Compare exact date (day, month, year)
        return orderDate.getDate() === filterDate.getDate() &&
               orderDate.getMonth() === filterDate.getMonth() &&
               orderDate.getFullYear() === filterDate.getFullYear();
      });
    }

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.deliveredAt || b.createdAt) - new Date(a.deliveredAt || a.createdAt);
        case 'oldest':
          return new Date(a.deliveredAt || a.createdAt) - new Date(b.deliveredAt || b.createdAt);
        case 'amount-high':
          return (parseFloat(b.total) || 0) - (parseFloat(a.total) || 0);
        case 'amount-low':
          return (parseFloat(a.total) || 0) - (parseFloat(b.total) || 0);
        case 'rating':
          return (b.customerRating || 0) - (a.customerRating || 0);
        default:
          return 0;
      }
    });

    setFilteredOrders(filtered);
  }, [orderGroup, searchTerm, sortBy, dateFilterActive, selectedDate]);

  // Calendar functions
  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
      setDateFilterActive(true);
      setShowCalendar(false);
    }
  };

  const clearDateFilter = () => {
    setSelectedDate('');
    setDateFilterActive(false);
    setShowCalendar(false);
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  const handleOverlayClick = () => {
    setShowCalendar(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="text-center">
          <Spinner type="diamond" text="Loading delivered orders..." />
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
            No orders have been delivered yet. Completed deliveries will appear here for tracking and customer feedback.
          </p>
        </div>
      </div>
    );
  }

  const totalRevenue = orderGroup.reduce((sum, order) => {
    const amount = parseFloat(order.total) || 0;
    return sum + amount;
  }, 0);
  const avgRating = orderGroup.reduce((sum, order) => sum + (order.customerRating || 0), 0) / orderGroup.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaCheckCircle className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Delivered Orders</h1>
                <p className="text-gray-600">Successfully completed diamond deliveries</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-full">
                <FaBox className="text-green-600" />
                <span className="font-medium text-green-800">{filteredOrders.length} orders delivered</span>
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
                  placeholder="Search by customer, order ID, or tracking number..."
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
                    className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-700 font-medium focus:border-green-400 focus:ring-2 focus:ring-green-100 focus:outline-none transition-all duration-300 cursor-pointer hover:border-gray-300 shadow-sm min-w-[180px]"
                  >
                    <option value="newest">Recently Delivered</option>
                    <option value="oldest">Oldest Delivered</option>
                    <option value="amount-high">Amount: High to Low</option>
                    <option value="amount-low">Amount: Low to High</option>
                    <option value="rating">Highest Rated</option>
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
                    {searchTerm ? 'Filtered Results' : 'Total Delivered'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
                  {searchTerm && (
                    <p className="text-xs text-gray-500 mt-1">
                      of {orderGroup.length} total orders
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
              </div>
            </div>
            
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {searchTerm ? 'Filtered Revenue' : 'Total Revenue'}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${filteredOrders.reduce((sum, order) => {
                      const amount = parseFloat(order.total) || 0;
                      return sum + amount;
                    }, 0).toLocaleString()}
                  </p>
                  {searchTerm && (
                    <p className="text-xs text-gray-500 mt-1">
                      of ${totalRevenue.toLocaleString()} total
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaBox className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="card-luxury p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {dateFilterActive ? 'Selected Date' : (searchTerm ? 'This Month (Filtered)' : 'This Month')}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredOrders.length}
                  </p>
                  {dateFilterActive && selectedDate && (
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-xs text-gray-500">
                        {formatDate(selectedDate)}
                      </p>
                      <button
                        onClick={clearDateFilter}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                  {searchTerm && !dateFilterActive && (
                    <p className="text-xs text-gray-500 mt-1">
                      of {orderGroup.filter(order => {
                        const deliveredDate = new Date(order.deliveredAt || order.createdAt);
                        const currentDate = new Date();
                        return deliveredDate.getMonth() === currentDate.getMonth();
                      }).length} total this month
                    </p>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() => {
                      console.log('Calendar button clicked, current state:', showCalendar);
                      setShowCalendar(!showCalendar);
                    }}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                      showCalendar
                        ? 'bg-red-500 text-white' 
                        : dateFilterActive 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                    }`}
                  >
                    <FaCalendarAlt className="text-xl" />
                  </button>

                  {/* Calendar Modal */}
                  {showCalendar && (
                    <>
                      {/* Overlay */}
                      <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
                        onClick={handleOverlayClick}
                      />
                      
                      {/* Calendar Modal */}
                      <div className="fixed inset-0 flex items-center justify-center z-[9999]">
                        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 w-96 max-w-[90vw]">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <FaCalendarAlt className="text-purple-600" />
                                Select Date
                              </h3>
                              <p className="text-gray-600 mt-1">Filter orders by delivery date</p>
                            </div>
                            <button
                              onClick={() => setShowCalendar(false)}
                              className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                              <FaTimes />
                            </button>
                          </div>

                          {/* Date Input */}
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Choose Date
                            </label>
                            <input
                              type="date"
                              value={selectedDate}
                              onChange={(e) => handleDateSelect(e.target.value)}
                              className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-lg transition-all duration-200"
                              max={new Date().toISOString().split('T')[0]}
                            />
                          </div>

                          {/* Current Filter Display */}
                          {dateFilterActive && selectedDate && (
                            <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                              <p className="text-sm text-purple-700">
                                <strong>Current Filter:</strong> {formatDate(selectedDate)}
                              </p>
                              <p className="text-xs text-purple-600 mt-1">
                                Showing {filteredOrders.length} orders from this date
                              </p>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <button
                              onClick={clearDateFilter}
                              className="flex-1 px-4 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 font-medium transition-colors duration-200"
                            >
                              Clear Filter
                            </button>
                            <button
                              onClick={() => setShowCalendar(false)}
                              className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-medium transition-colors duration-200"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
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
                  onDelete={fetchDeliveredData}
                  onStatusChange={fetchDeliveredData}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDelivered;
