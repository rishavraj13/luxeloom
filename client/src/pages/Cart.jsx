import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'your'} text2={'cart'} />
      </div>
      <div className='flex flex-col sm:flex-row gap-5 sm:gap-20'>
        <div className='w-full md:h-[75vh] md:overflow-auto'>
          {
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_o.5fr] items-center gap-4'>
                  <Link to={`/product/${productData._id}`} className='flex items-start gap-6'>
                    <img src={productData.image[0]} alt="" className='w-16 sm:w-20' />
                    <div>
                      <p className='text-sxs sm:text-lg font-medium'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{(85 * productData.price) - 1}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                  </Link>
                  <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} type="number" min={1} defaultValue={item.quantity} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' />
                  <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} alt="" className='w-4 mr-4 sm:w-5 cursor-pointer' />
                </div>
              )
            })
          }
        </div>
        <div className='flex justify-end items-end sm:my-10'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <div className='w-full text-end'>
              <button onClick={() => navigate('/place-order')} className='uppercase bg-black text-white text-sm mt-8 px-8 py-3'>Proceed to checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart