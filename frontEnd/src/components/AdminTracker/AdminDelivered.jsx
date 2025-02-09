import React, { useEffect, useState } from 'react';
import { backendUrl } from '../../server';
import { get_data } from '../../services/data_requests/get_data_request';
import SingleAdminItem from './SingleAdminItem';
import Spinner from '../Spinner';

function AdminDelivered() {
  const [orderGroup, setOrderGroup] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingData = async () => {
    setLoading(true);
    try {
      const response = await get_data(`${backendUrl}/api/v1/adminDelivered`);
      const orderItems = response.data;
      setOrderGroup(orderItems);

    } catch (error) {
      console.error('Error fetching pending orders:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!orderGroup || orderGroup.length === 0) {
    return <div className="text-center mt-4 ">No delivered orders found.</div>;
  }

  return (
    <div className='bg-black min-h-screen'>
      <div className="text-white p-4 grid gap-4 grid-cols-1 md:grid-cols-2">
        {orderGroup.map((order) => (
            <SingleAdminItem
                key={order.id}
                order={order}
                onDelete={fetchPendingData}
                onStatusChange={fetchPendingData}
            />
        ))}
      </div>
    </div>
  );
}

export default AdminDelivered;
