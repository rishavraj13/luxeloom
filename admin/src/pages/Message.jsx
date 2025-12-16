import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import { Trash2, Loader2, Send } from 'lucide-react';

const Message = ({ token }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [replyLoading, setReplyLoading] = useState(false);
  const [replies, setReplies] = useState(""); // Track replies by message id

  const fetchMessages = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/message/list', { headers: { token } });
      if (response.data.success) {
        setMessages(response.data.messages);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeMessage = async (id) => {
    setConfirmLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/message/remove`, { id }, { headers: { token } });
      if (response.data.success) {
        toast.success("Message deleted successfully!");
        await fetchMessages(); // Update the list after successful removal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setConfirmLoading(false);
      setMessageToDelete(null); // Close confirmation modal
    }
  };

  const handleDeleteClick = (id) => {
    setMessageToDelete(id); // Show the confirmation modal
  };

  const handleConfirmDelete = () => {
    if (messageToDelete) {
      removeMessage(messageToDelete);
    }
  };

  const handleCancelDelete = () => {
    setMessageToDelete(null); // Close confirmation modal
  };

  // Updated generateReply function for frontend
  const generateReply = async (id, reply) => {
    setReplyLoading(true);
    try {
      const requestBody = {
        id,
        reply
      };
      const response = await axios.post(`${backendUrl}/api/message/reply`, requestBody, { headers: { token } });
      if (response.data.success) {
        toast.success("Reply sent successfully!");
        await fetchMessages(); // Update the list after successful reply
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setReplyLoading(false);
    }
  };

  const handleReplyChange = (value) => {
    setReplies(value);
  };

  console.log(replies); // Log the replies state to see the current value

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <p className="mb-2 font-semibold text-xl">All Messages</p>
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg shadow-sm animate-pulse space-y-2"
            >
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg._id} className={`p-4 border rounded-lg shadow-sm relative ${msg.status ? 'opacity-60' : 'opacity-100'}`}>
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Phone:</strong> {msg.phone}</p>
              <p><strong>Message:</strong> {msg.text}</p>
              <p className="text-sm text-gray-500">
                {new Date(msg.date).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </p>
              <div className="absolute top-5 right-5">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteClick(msg._id)} // Open confirmation modal
                  disabled={confirmLoading}
                >
                  <Trash2 size={24} />
                </button>
              </div>
              {
                !msg.status ? (
                  <div className="mt-2 my-2 border-gray-500/50 rounded-md flex items-center h-full">
                    <input
                      type="text"
                      disabled={msg.status}
                      placeholder="Enter the reply..."
                      className="w-full focus:outline-none text-gray-500 placeholder:text-gray-500/50 p-2 rounded-l-md"
                      onChange={(e) => handleReplyChange(e.target.value)} // Capture the typed value
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-[#b28878] text-white transition-all rounded-md mt-0 ml-2 flex items-center justify-center w-fit h-full active:scale-75 active:duration-300 active:ease-in-out"
                      disabled={replyLoading || msg.status}
                      onClick={() => generateReply(msg._id, replies)} // Use the value from the input field
                    >
                      {replyLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="size-6" />}
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 my-2 border-gray-500/50 rounded-md flex flex-col items-center h-full">
                    <div
                      className="w-full focus:outline-none text-gray-500 placeholder:text-gray-500/50 p-2 rounded-md border border-[#b28878]"
                    >{msg.reply}</div>
                    <div className='w-full text-right text-xs'>
                      {new Date(msg.replyDate).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </div>
                  </div>
                )
              }
            </div>
          ))
        ) : (
          <p>No messages available.</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {messageToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <p className="text-lg font-semibold">Are you sure you want to delete this message?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 min-w-[80px] flex items-center justify-center"
                onClick={handleConfirmDelete}
                disabled={confirmLoading}
              >
                {confirmLoading ? <Loader2 className="animate-spin text-center" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
