import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { get_data } from '../../services/data_requests/get_data_request';
import { backendUrl } from '../../server';
import Spinner from '../Spinner';
import SingleItem from './SingleItem';

function ClientDispatch({items}) {
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
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      );
    }
    
  if (!orderGroup || orderGroup.length === 0) {
    return <div  className='w-screen h-screen flex justify-center items-center font-bold'>No orders found.</div>;
  }

  return (
    <div className="space-y-4 min-h-screen bg-neutral-900">
    {orderGroup.map(order => (
      <SingleItem key={order._id?.$oid || order._id} item={order} />
    ))}
  </div>
  )
}

export default ClientDispatch