import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import { Trash2 } from 'lucide-react';

const Users = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(null);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(null); // user object to delete
  const [confirmLoading, setConfirmLoading] = useState(false); // loading state for confirm popup

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + '/api/user/list', { headers: { token } });
      if (response.data.success) {
        setList(response.data.users);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    setConfirmLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/remove`, { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchUser();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setConfirmLoading(false);
      setConfirmDeleteUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <p className="mb-2 font-semibold text-xl">All Users</p>
      {confirmDeleteUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete <b>{confirmDeleteUser.name}</b>?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteUser(null)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-sm"
                disabled={confirmLoading}
              >
                Cancel
              </button>
              <button
                onClick={() => removeUser(confirmDeleteUser._id)}
                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm flex items-center gap-2 min-w-[80px]"
                disabled={confirmLoading}
              >
                {confirmLoading ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[2fr_3fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm font-bold">
          <p>Name</p>
          <p>Email</p>
          <p className="text-center">Action</p>
        </div>

        {/* Loading Skeleton */}
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="hidden md:grid grid-cols-[2fr_3fr_1fr] items-center gap-2 py-2 px-2 border text-sm animate-pulse">
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
              <div className="h-4 bg-gray-300 rounded col-span-1"></div>
            </div>
          ))}

        {/* Mobile Loading Skeleton */}
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="block md:hidden">
              <div className="flex flex-col gap-2 py-2 px-2 border animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4 self-end"></div>
              </div>
            </div>
          ))}

        {/* User List Desktop */}
        {!loading && list.map((user) => (
          <div key={user._id} className="hidden md:grid grid-cols-[2fr_3fr_1fr] items-center gap-2 py-2 px-2 border text-sm">
            <p className='w-full flex items-center justify-start text-xs md:text-base truncate'>{user.name}</p>
            <p className='w-full flex items-center justify-start text-xs md:text-base truncate'>{user.email}</p>
            <p className="flex justify-center">
              <button
                onClick={() => setConfirmDeleteUser(user)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={24} />
              </button>
            </p>
          </div>
        ))}

        {/* User List Mobile */}
        {!loading && list.map((user) => (
          <div key={user._id} className="md:hidden border py-2 px-2 text-sm flex flex-col gap-1">
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setConfirmDeleteUser(user)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
