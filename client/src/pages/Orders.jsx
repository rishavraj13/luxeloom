import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { RefreshCw } from 'lucide-react';

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState({});

  const loadOrderData = async () => {
    setLoading(true);
    try {
      if (!token) return;

      const response = await axios.post(backendUrl + '/api/order/userOrders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({ ...item, ...order });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const refreshOrder = async (orderId) => {
    setLoadingOrders((prev) => ({ ...prev, [orderId]: true }));
    try {
      const response = await axios.post(`${backendUrl}/api/order/userOrders`, {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({ ...item, ...order });
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
    }
    setLoadingOrders((prev) => ({ ...prev, [orderId]: false }));
  };


  useEffect(() => {
    loadOrderData();
  }, [token]);

  useEffect(() => {
    refreshOrder()
  }, [token]);

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'my'} text2={'orders'} />
      </div>
      <div>
        {loading ? (
          Array(5).fill().map((_, index) => (
            <div key={index} className='py-4 border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-pulse'>
              <div className='flex items-start gap-6'>
                <div className='w-16 h-16 bg-gray-300 rounded'></div>
                <div>
                  <div className='w-48 h-5 bg-gray-300 rounded mb-2'></div>
                  <div className='w-24 h-4 bg-gray-300 rounded mb-1'></div>
                  <div className='w-32 h-4 bg-gray-300 rounded'></div>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='w-24 h-5 bg-gray-300 rounded'></div>
                <div className='w-24 h-8 bg-gray-300 rounded'></div>
              </div>
            </div>
          ))
        ) : (
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm cursor-pointer'>
                <img src={item.image[0]} alt='' className='w-16 sm:w-20' />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p className='text-lg'>{currency} {item.amount}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                <button onClick={() => refreshOrder(item._id)} className='border px-4 py-2 text-sm font-medium rounded-sm flex items-center gap-2' disabled={loadingOrders[item._id]} >
                  <RefreshCw className={`transition-transform ${loadingOrders[item._id] ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
