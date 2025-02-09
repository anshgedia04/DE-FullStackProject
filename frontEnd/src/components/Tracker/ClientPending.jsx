import React, { useEffect, useState } from 'react';
import { get_data } from '../../services/data_requests/get_data_request';
import { backendUrl } from '../../server';
import { useSelector } from 'react-redux';
import SingleItem from './SingleItem';
import Spinner from '../Spinner';

function ClientPending() {
  // Initialize as an empty array if expecting an array of orders.
  const [orderGroup, setOrderGroup] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  const pendingData = async () => {
    setLoading(true);
    try {
      const response = await get_data(`${backendUrl}/api/v1/getPendingReviewed/${userId}`);
      const orderItems = response.data; 
      console.log(orderItems);
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
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!orderGroup || orderGroup.length === 0) {
    return <div  className='w-screen h-screen  flex justify-center items-center font-bold'>No orders found.</div>;
  }

  return (
    <div className="space-y-2  min-h-screen bg-neutral-900">
      {orderGroup.map(order => (
        <SingleItem key={order._id?.$oid || order._id} item={order} onDelete={pendingData}/>
      ))}
    </div>
  );
}

export default ClientPending;
