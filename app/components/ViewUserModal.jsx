// ViewUserModal.js
'use client';

const ViewUserModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
      <div className="bg-black p-6 rounded-lg shadow-md max-w-lg w-full shadow-purple-400">
        <h2 className="text-2xl font-bold mb-4 text-black">User Details</h2>
        <div className=" space-y-3">
          <p className="text-white"><strong>Name:</strong> {user.name}</p>
          <p className="text-white"><strong>Email:</strong> {user.email}</p>
          <p className="text-white"><strong>Phone:</strong> {user.phone}</p>
          <p className="text-white"><strong>Website:</strong> {user.website}</p>
          <p className="text-white"><strong>Company:</strong> {user.company?.name}</p>
          <p className="text-white"><strong>Address:</strong> {user.address?.street}, {user.address?.city}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
