import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import { API_PATHS } from "../../../utils/apiPaths";

const SelectUsers = ({ selectedUsers = [], setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.USERS.GET_ALL_EMPLOYEES
      );
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  // avatars for currently selected users
  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl || null);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    // initialize temp selection from props
    setTempSelectedUsers(Array.isArray(selectedUsers) ? selectedUsers : []);
  }, [selectedUsers]);

  return (
    <div>
      <div className="flex items-center gap-2">
        {selectedUserAvatars.length > 0 ? (
          selectedUserAvatars.map((src, idx) => (
            <img
              key={idx}
              src={src || undefined}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ))
        ) : (
          <div className="text-sm text-gray-500">No users selected</div>
        )}

        <button
          type="button"
          className="ml-2 btn-secondary"
          onClick={() => setIsModalOpen(true)}
        >
          Select Users
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded shadow-lg w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto p-4">
            <h4 className="text-lg font-medium mb-3">Select Users</h4>
            <div className="grid gap-2">
              {allUsers.map((user) => (
                <label key={user._id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={tempSelectedUsers.includes(user._id)}
                    onChange={() => toggleUserSelection(user._id)}
                  />
                  <img
                    src={user.profileImageUrl || undefined}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user.name}</span>
                </label>
              ))}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleAssign}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectUsers;
