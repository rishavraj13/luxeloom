import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { Trash2, Loader2 } from 'lucide-react';
import { assets } from '../assets/assets';

const List = ({ token }) => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + '/api/product/list', { headers: { token } })
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowConfirm(true);
  }

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id: selectedProduct._id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setDeleteLoading(false);
      setShowConfirm(false);
      setSelectedProduct(null);
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div>
      <p className='mb-2 font-semibold text-xl'>All Products</p>
      <div className='flex flex-col gap-2'>

        {/* Table Headers */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Loading Shimmers */}
        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='hidden md:block'>
              <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm animate-pulse">
                <div className="w-12 h-12 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded col-span-1"></div>
                <div className="h-4 bg-gray-300 rounded col-span-1"></div>
                <div className="h-4 bg-gray-300 rounded col-span-1"></div>
                <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              </div>
            </div>
          ))
        }
        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='block md:hidden'>
              <div className='flex items-center justify-around gap-2 py-1 px-2 border text-sm animate-pulse'>
                <div className="w-20 h-20 bg-gray-300 rounded"></div>
                <div className='w-1/2 flex flex-col gap-2'>
                  <div className='h-3 w-full bg-gray-300 rounded'></div>
                  <div className='h-3 w-full bg-gray-300 rounded'></div>
                  <div className='h-3 w-full bg-gray-300 rounded'></div>
                  <div className='h-3 w-full bg-gray-300 rounded'></div>
                </div>
              </div>
            </div>
          ))
        }

        {/* List Items */}
        {!loading && list.map((item, index) => (
          <div key={index}>
            {/* Desktop */}
            <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
              <img src={item.image[0]} alt="" className='w-12' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency} {(85 * item.price) - 1}</p>
              <p onClick={() => handleDeleteClick(item)} className='flex justify-center cursor-pointer text-red-500 hover:text-red-700'><Trash2 size={24} /></p>
            </div>

            {/* Mobile */}
            <div className='block md:hidden'>
              <div className='flex items-center justify-around gap-2 py-1 px-2 border text-sm'>
                <img src={item.image[0]} alt="" className='w-20' />
                <div className='w-1/2'>
                  <p className='w-full truncate'>{item.name}</p>
                  <p className='w-full flex items-center justify-start'>{item.category}</p>
                  <p className='w-full flex items-center justify-start'>{currency} {(85 * item.price) - 1}</p>
                  <p onClick={() => handleDeleteClick(item)} className='w-full flex items-center justify-end cursor-pointer text-red-500 hover:text-red-700'><Trash2 size={24} /></p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Delete Confirmation Modal */}
        {showConfirm && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Confirm Deletion</h2>
              <div className="flex flex-col items-center text-center">
                <img src={selectedProduct.image[0]} alt={selectedProduct.name} className="w-24 h-24 object-cover rounded mb-2" />
                <p className="font-semibold">{selectedProduct.name}</p>
                <p className="text-sm text-gray-500">{selectedProduct.category}</p>
                <p className="text-md font-bold">{currency} {(85 * selectedProduct.price) - 1}</p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowConfirm(false);
                    setSelectedProduct(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center min-w-[80px]"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default List;
