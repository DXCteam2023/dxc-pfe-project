"use client";
import React, { useState, useEffect } from "react";

import UpdateUserForm from "./updateUserForm";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
const Table = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profileFilter, setProfileFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    // Récupérer les utilisateurs depuis le backend
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await axios.get("http://localhost:5000/api/user");
      const usersData = response.data;

      setUsers(usersData);
      // console.log(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  }
  getUsers();
  
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedUsers(selectAll ? [] : users.map((user) => user._id));
  };
  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      const userValues = Object.values(user).join(" ").toLowerCase();
      const isMatchingSearchTerm = userValues.includes(
        searchTerm.toLowerCase(),
      );
      const isMatchingStatus =
        profileFilter === "All" || user.profile === profileFilter;

      return isMatchingSearchTerm && isMatchingStatus;
    });

    setData(filteredUsers);
  }, [searchTerm, profileFilter, users]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleProfileFilter = (event) => {
    setProfileFilter(event.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleDeleteClick = (userId) => {
    const updatedData = users.filter((user) => user._id !== userId);
    setUsers(updatedData);
    console.log("Utilisateur supprimé avec succès.");
    // console.log("data:", updatedData); // Vérifiez la valeur de data après la mise à jour
  };
  const handleDeleteUser = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "It will permanently delete the user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await handleConfirmDelete(userId);
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/user/${userId}`,
      );
      console.log(response.data);
      setShowAlert(false);
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  const handleDeleteSelectedUsers = () => {
    const updatedData = users.filter(
      (user) => !selectedUsers.includes(user._id),
    );
    setUsers(updatedData);
    setSelectedUsers([]);
  };

  const handleCheckboxChange = (event, userId) => {
    const target = event.target;
    if (target.checked) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => id !== userId),
      );
    }
    setSelectAll(false);
  };
  useEffect(() => {
   
  }, [editingUserId]);

  // const handleInputChange = (event, field, userId) => {
  // const { value } = event.target;
  // setData((prevData) =>
  //  prevData.map((user) =>
  //    user.id === userId ? { ...user, [field]: value } : user,
  //  ),
  // );
  // };

  const handleEditUser = (selectedUser) => {
    setEditingUserId(selectedUser._id);
    setIsUpdateFormVisible(true);
  };

  //const handleCancelEdit = () => {
  // setEditingIndex(null);
  // };

  //const handleUpdateUser = (updatedUser) => {
  // setEditingIndex(null);
  //};

  //const editUser = (selectedUser) => {
  //  console.log(selectedUser)
  // }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = data.filter((user) => {
    if (profileFilter === "All") {
      return true;
    }
    return user.profile.toLowerCase() === profileFilter.toLowerCase();
  });

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const [showForm, setShowForm] = useState(false);

  //const handleViewDetail = () => {
  ////  window.open("/admin/user/");

  //console.log("click");
  //};
  return (
    <div>
      <div className="ml-2 container mx-auto px-4 sm:px-8 flex mt-2">
        {editingUserId !== null && editingUserId !== 0 && (
          <UpdateUserForm
            user={users.find((user) => user._id === editingUserId)}
            onCancel={() => setEditingUserId(null)}
            onClose={() => setShowForm(false)}
            // userToEdit={userToEdit}
          />
        )}
      </div>

      <div className="flex w-full">
        <div className="w-full">
          <div className="ml-2 flex mt-2 ">
            <div className="container mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div>
                  <h2 className="text-2xl font-semibold leading-tight">
                    List Users
                  </h2>
                </div>
                <div className="my-2 flex sm:flex-row flex-col">
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearch}
                    className="px-3 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                  />
                  <select
                    onChange={handleProfileFilter}
                    value={profileFilter}
                    className="ml-2 px-3 py-2 border border-gray-300 focus:outline-none rounded-lg shadow-sm"
                  >
                    <option value="All">All</option>
                    <option value="Commercial Agent">Agent</option>
                    <option value="Product Offering Manager">Manager</option>
                  </select>
                </div>
                <div className="mb-4">
                  {selectedUsers.length > 0 && (
                    <button
                      onClick={handleDeleteSelectedUsers}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Delete Selected Users
                    </button>
                  )}
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative min-w-full leading-normal">
                      <thead>
                        <tr className="text-left">
                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="form-checkbox text-gray-800"
                                checked={selectAll}
                                onChange={handleSelectAll}
                              />
                            </label>
                          </th>
                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Username
                          </th>
                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Profile
                          </th>
                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            UserID
                          </th>

                          <th className="px-5 py-3 border-b-2 border-purple-200 bg-purple-800 text-white text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user, index) => (
                          <tr key={user.id}>
                            <td className="border-dashed border-t border-gray-200 px-3">
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox text-gray-800"
                                  checked={selectedUsers.includes(user._id)}
                                  onChange={(event) =>
                                    handleCheckboxChange(event, user._id)
                                  }
                                />
                              </label>
                            </td>
                            <td className="border-dashed border-t border-gray-200 px-3">
                              {editingIndex === index ? (
                                <input
                                  type="text"
                                  className="border border-gray-300 px-3 py-1 w-full"
                                />
                              ) : (
                                <span className="text-gray-700 hover:text-gray-500 cursor-pointer">
                                  {user.username}
                                </span>
                              )}
                            </td>
                            <td className="border-dashed border-t border-gray-200 px-3">
                              {editingIndex === index ? (
                                <input
                                  type="text"
                                  className="border border-gray-300 px-3 py-1 w-full"
                                />
                              ) : (
                                <span className="text-gray-700 hover:text-gray-500 cursor-pointer">
                                  {user.profile}
                                </span>
                              )}
                            </td>
                            <td className="border-dashed border-t border-gray-200 px-3">
                              {editingIndex === index ? (
                                <input
                                  type="text"
                                  className="border border-gray-300 px-3 py-1 w-full"
                                />
                              ) : (
                                <span className="text-gray-700 hover:text-gray-500 cursor-pointer">
                                  {user.role}
                                </span>
                              )}
                            </td>
                            <td className="border-dashed border-t border-gray-200 px-3">
                              {editingIndex === index ? (
                                <input
                                  type="text"
                                  className="border border-gray-300 px-3 py-1 w-full"
                                />
                              ) : (
                                <span className="text-gray-700 hover:text-gray-500 cursor-pointer">
                                  {user.userID}
                                </span>
                              )}
                            </td>

                            <td className="border-dashed border-t border-gray-200 px-3">
                              <div className="flex">
                                <Link href={`/admin/user/${user._id}`}>
                                  <FaEye className="text-blue-500 text-lg"/>
                                </Link>

                                <button
                                  className="w-5 mr-2 transform hover:text-purple-500 hover:scale-110"
                                  //value={currentUser.id}
                                  onClick={() => handleEditUser(user)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="green"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </button>

                                {/* <button
                                  className="w-5 mr-2 transform hover:text-purple-500 hover:scale-110"
                                  onClick={() => handleDeleteClick(user._id)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="red"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button> */}
                                <button
                                  className="w-5 mr-2 transform hover:text-purple-500 hover:scale-110"
                                  onClick={() => handleDeleteUser(user._id)}
                                >
                                  {" "}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="red"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="bg-purple-300 hover:bg-purple-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
                    >
                      Previous Page
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={currentUsers.length < usersPerPage}
                      className="bg-purple-300 hover:bg-purple-400  text-gray-800 font-semibold py-2 px-4 rounded-r"
                    >
                      Next Page
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
