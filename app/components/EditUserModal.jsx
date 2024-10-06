'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserModal = ({ isOpen, onClose, user, onEdit }) => {
  const [formData, setFormData] = useState(user || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({}); // State for validation errors

  // Update formData when user changes
  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation logic
  const validateForm = () => {
    const errors = {};
    if (!formData.name || formData.name.length < 3) {
      errors.name = 'Name is required and should be at least 3 characters.';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'A valid email is required.';
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number is required and should be exactly 10 digits.';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Set validation errors
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${user.id}`,
        formData
      );
      onEdit(response.data);
      setLoading(false);
      handleCancel(); // Reset form and errors on successful submit
    } catch (error) {
      setError('Failed to update user');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(user || {});          // Reset form data to original user data
    setValidationErrors({});          // Clear validation errors
    setError('');                     // Clear general error message
    onClose();                        // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
      <div className="bg-black p-6 rounded-lg shadow-md max-w-lg w-full shadow-purple-400">
        <h2 className="text-2xl font-bold mb-4 text-purple-500">Edit User</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData?.name || ''} // Safely access formData
              onChange={handleChange}
              className={`bg-black p-2 w-full text-white outline-none border-b ${
                validationErrors.name ? 'border-red-500' : 'border-gray-400'
              }`}
              required
            />
            {validationErrors.name && (
              <p className="text-red-500 text-sm">{validationErrors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData?.email || ''} // Safely access formData
              onChange={handleChange}
              className={`bg-black p-2 w-full text-white outline-none border-b ${
                validationErrors.email ? 'border-red-500' : 'border-gray-400'
              }`}
              required
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm">{validationErrors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData?.phone || ''} // Safely access formData
              onChange={handleChange}
              className={`bg-black p-2 w-full text-white outline-none border-b ${
                validationErrors.phone ? 'border-red-500' : 'border-gray-400'
              }`}
              required
            />
            {validationErrors.phone && (
              <p className="text-red-500 text-sm">{validationErrors.phone}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-purple-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleCancel}  // Updated to call handleCancel
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
