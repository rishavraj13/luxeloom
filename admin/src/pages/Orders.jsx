import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../App';
import ImageCarousel from '../components/ImageCarousel';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      setLoading(true)
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  const updateStatus = async (e, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: e.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 animate-pulse">
                <div className="w-full md:w-24 bg-gray-300 h-24"></div>
                <div className="space-y-4">
                  <div className="w-3/4 bg-gray-300 h-4"></div>
                  <div className="w-1/2 bg-gray-300 h-4"></div>
                  <div className="w-3/4 bg-gray-300 h-4"></div>
                  <div className="w-2/3 bg-gray-300 h-4"></div>
                </div>
                <div className="space-y-3">
                  <div className="w-1/2 bg-gray-300 h-4"></div>
                  <div className="w-2/3 bg-gray-300 h-4"></div>
                  <div className="w-1/3 bg-gray-300 h-4"></div>
                </div>
                <div className="w-1/4 bg-gray-300 h-4"></div>
                <div className="w-1/2 bg-gray-300 h-4"></div>
              </div>
            ))
          ) : (
            orders.map((order, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
                <div className="w-full md:w-24">
                  <ImageCarousel items={order.items} />
                </div>
                <div>
                  <div>
                    {order.items.map((item, index) => (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    ))}
                  </div>
                  <p className="mt-3 mb-2 font-medium">{order.address.firstName + ' ' + order.address.lastName}</p>
                  <div>
                    <p>{order.address.street + ','}</p>
                    <p>{order.address.City + ',' + order.address.state + ',' + order.address.country + ',' + order.address.zipcode}</p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <div>
                  <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
                  <p className="mt-3">Method : {order.paymentMethod}</p>
                  <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                  <p>Date : {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className="text-sm sm:text-[15px]">{currency} {order.amount}</p>
                <select onChange={(e) => updateStatus(e, order._id)} value={order.status} className="p-2 font-semibold">
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
};

export default Orders;
