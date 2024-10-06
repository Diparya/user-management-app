'use client';

import axios from 'axios';
import { useState } from 'react';

const DeleteUserModal = ({ isOpen, onClose, user, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`);
      onDelete(user.id);
      setLoading(false);
      onClose();
    } catch (error) {
      console.error('Failed to delete user');
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
        <div className="bg-black p-6 rounded-lg shadow-md max-w-lg w-full shadow-purple-400">
          <h2 className="text-2xl font-bold mb-4 text-purple-500">Delete User</h2>
          <p className='text-white'>Are you sure you want to delete {user?.name}?</p>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DeleteUserModal;
