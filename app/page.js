'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import DeleteUserModal from "./components/DeleteUserModal";
import EditUserModal from "./components/EditUserModal";
import CreateUserModal from "./components/CreateUserModal";
import ViewUserModal from "./components/ViewUserModal"; // Import the View modal component

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // New state for View modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const formatPhoneNumber = (phone) => {
    // Extract only the digits
    const digits = phone.replace(/\D/g, '');
    // Return only the first 10 digits
    return digits.length >= 10 ? digits.slice(0, 10) : digits;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from JSONPlaceholder API
  const fetchUsers = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    const sanitizedUsers = response.data.map(user => ({
      ...user,
      phone: formatPhoneNumber(user.phone),  // Sanitize the phone number
    }));
    setUsers(sanitizedUsers);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching users:", error);
    setLoading(false);
  }
};

  // Function to open the create user modal
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // Function to open the edit modal with selected user data
  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Function to open the delete confirmation modal with selected user
  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Function to open the view modal with selected user data
  const handleOpenViewModal = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  // Function to update the user list after creation
  const handleCreateUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // Function to update the user list after edit
  const handleEditUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  // Function to update the user list after deletion
  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  // Function to filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-left text-purple-400">User Management</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded bg-black outline-none"
        />
      </div>
      </div>
      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md shadow-purple-600">
          <table className="min-w-full table-auto">
            <thead className="bg-purple-300">
              <tr>
                <th className="px-2 sm:px-4 py-2 text-black">Name</th>
                <th className="px-2 sm:px-4 py-2 text-black">Email</th>
                <th className="px-2 sm:px-4 py-2 text-black">Phone</th>
                <th className="px-2 sm:px-4 py-2 text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="bg-black">
                  <td className=" px-2 sm:px-4 py-2 text-gray-300">{user.name}</td>
                  <td className="px-2 sm:px-4 py-2 text-gray-300">{user.email}</td>
                  <td className="px-2 sm:px-4 py-2 text-gray-300">{user.phone}</td>
                  <td className="px-2 sm:px-4 py-2 space-y-3 flex flex-col justify-between lg:flex-row lg:justify-evenly lg:items-center">
                    {/* View button */}
                    <button
                      onClick={() => handleOpenViewModal(user)} 
                      className="border border-blue-300 text-blue-300 hover:bg-blue-300 hover:text-white px-2 sm:px-4 py-2 mt-2 rounded mr-1 sm:mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleOpenEditModal(user)}
                      className="border border-green-300 text-green-300 hover:bg-green-300 hover:text-white px-2 sm:px-4 py-2 rounded mr-1 sm:mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleOpenDeleteModal(user)}
                      className="border border-red-300 text-red-300 hover:bg-red-300 hover:text-white px-2 sm:px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={handleOpenCreateModal}
        className="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-4 py-2 rounded mt-4 w-full sm:w-auto"
      >
        Create User
      </button>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateUser}
      />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onEdit={handleEditUser}
      />

      {/* Delete User Confirmation Modal */}
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        user={selectedUser}
        onDelete={handleDeleteUser}
      />

      {/* View User Modal */}
      <ViewUserModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}
