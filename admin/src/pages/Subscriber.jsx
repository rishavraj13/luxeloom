import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { Trash2, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Subscriber = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedSubscriber, setSelectedSubscriber] = useState("")

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/subscriber/list`, { headers: { token } });
      if (response.data.success) {
        setList(response.data.subscribers);
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id, mail) => {
    setSelectedId(id);
    setSelectedSubscriber(mail);
    setModalOpen(true);
  };

  const removeSubscriber = async () => {
    setRemoveLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/subscriber/remove`, { id: selectedId }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setRemoveLoading(false);
      setModalOpen(false);
      setSelectedId(null);
      setSelectedSubscriber("");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className='mb-2 font-semibold text-xl'>All Subscribers</p>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-gray-600 text-sm">Are you sure you want to delete <b>{selectedSubscriber}</b>?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setSelectedId(null);
                }}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm font-semibold"
                disabled={removeLoading}
              >
                Cancel
              </button>
              <button
                onClick={removeSubscriber}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold flex items-center justify-center min-w-[80px]"
                disabled={removeLoading}
              >
                {removeLoading ? <Loader2 className="animate-spin" size={20} /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscriber List */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='col-span-1 grid grid-cols-[3fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-bold'>
          <span>Subscribers</span>
          <span className='text-center'>Action</span>
        </div>
        <div className='col-span-1 hidden md:grid grid-cols-[3fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-bold'>
          <span>Subscribers</span>
          <span className='text-center'>Action</span>
        </div>

        {loading &&
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='col-span-1 grid grid-cols-[3fr_1fr] items-center py-2 px-4 border text-sm animate-pulse'>
              <div className='h-4 w-full bg-gray-300 rounded'></div>
              <div className='w-full flex items-center justify-center'>
                <div className='h-6 w-6 bg-gray-300 rounded'></div>
              </div>
            </div>
          ))
        }

        {!loading && list.map((subscriber) => (
          <div key={subscriber._id} className='col-span-1 grid grid-cols-[3fr_1fr] items-center py-2 px-4 border text-sm'>
            <p className='w-full flex items-center justify-start text-xs md:text-base truncate'>{subscriber.email}</p>
            <p
              onClick={() => handleDeleteClick(subscriber._id, subscriber.email)}
              className='w-full flex items-center justify-center cursor-pointer text-red-500 hover:text-red-700'
            >
              <Trash2 size={24} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriber;
