'use client';

import axios from 'axios';
import { useState } from 'react';

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    companyName: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || formData.name.length < 3) return 'Name is required and should be at least 3 characters';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) return 'Valid email is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) return 'Valid phone number is required';
    if (!formData.street || !formData.city) return 'Address (street and city) is required';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
        },
        company: {
          name: formData.companyName,
        },
      });

      onCreate(response.data); // Pass new user data to parent
      setLoading(false);
      onClose(); // Close modal after successful creation
      setFormData({name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        companyName: '',})
    } catch (error) {
      console.error('Error creating user:', error);
      setError('An error occurred while creating the user.');
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
        <div className="bg-black p-6 rounded-lg shadow-md max-w-lg w-full shadow-purple-400">
          <h2 className="text-2xl font-bold mb-4 text-purple-500">Create New User</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-white">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-b border-gray-300 outline-none bg-black p-2 w-full text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-b border-gray-300 outline-none bg-black p-2 w-full text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border-b border-gray-300 outline-none bg-black p-2 w-full text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">Street</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="border-b border-gray-300 outline-none bg-black p-2 w-full text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border-b border-gray-300 outline-none bg-black p-2 w-full text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="border-b border-gray-300 outline-none bg-black p-2 w-full text-white"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateUserModal;
