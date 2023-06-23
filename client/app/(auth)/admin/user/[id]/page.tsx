"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as dotenv from "dotenv";
// import { Chart, initTE } from "tw-elements";
import Sidebar from "../../../dashboard/components/Sidebar";
import Header from "../../../dashboard/components/header/Header";
import couver from "../../../../../public/assets/couver.jpeg";
import avatar from "../../../../../public/assets/avatar.png";
import DoughnutChart from "./ChartCercle";
import LineChart from "./LineChart";
import PieChart from "./PiChart";
import BarChart from "./BarChar";
import AdminStatistique from "./AdminStats";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const Page = ({ params }: { params: { id: string; profile: string } }) => {
  const [user, setUser] = useState<any>(null);
  const [similarProfiles, setSimilarProfiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const id = params.id;
      const response = await axios.get(`${AXIOS_URL}/api/user/${id}`);
      const userData = response.data;
      setUser(userData);
      console.log(userData);

      const profile = userData.profile;
      const similarProfilesResponse = await axios.get(
        `${AXIOS_URL}/api/user/similar-profile/${profile}`,
      );
      const similarProfilesData = similarProfilesResponse.data;
      setSimilarProfiles(similarProfilesData);
      console.log("hello", similarProfilesData);
    } catch (error) {
      console.error("Error while fetching user data:", error);
    }
  };
  // useEffect(() => {
  //   getUserData();
  // }, []);

  // const getUserData = async () => {
  //   try {
  //     const userId = params.id;
  //     const response = await axios.get(
  //       `${AXIOS_URL}/api/user/${userId}`,
  //     );
  //     const userData = response.data;
  //     setUser(userData);
  //   } catch (error) {
  //     console.error("Error while fetching user:", error);
  //   }
  // };

  const updateUserPassword = async () => {
    try {
      const response = await axios.patch(
        `${AXIOS_URL}/api/user/update-password`,
        {
          userId: user._id,
          oldPassword,
          newPassword,
        },
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Le mot de passe a été modifié avec succès.",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Une erreur s'est produite lors de la modification du mot de passe.",
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        text: `Une erreur est survenue lors de la modification du mot de passe : ${error.message}`,
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        text: "Les mots de passe ne correspondent pas.",
      });
      return;
    }
    updateUserPassword();
  };

  const handleConfirmation = () => {
    setShowConfirmationAlert(false);
    Swal.fire({
      title: "Réinitialiser le mot de passe",
      text: "Voulez-vous vraiment réinitialiser le mot de passe ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Mot de passe réinitialisé avec succès !", "", "success");
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!user) {
    return null;
  }
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="user">
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white min-h-screen-100 w-5/6">
          <Header />
          {user && (
            <div>
              <div className="h-full bg-white p-8">
                <div className="bg-white rounded-lg shadow-xl pb-8">
                  <div className="w-full h-[250px]">
                    <Image
                      src={couver}
                      className="w-full h-full rounded-tl-lg rounded-tr-lg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-center -mt-20">
                    <Image
                      src={avatar}
                      className="w-40 border-4 border-white rounded-full"
                      alt=""
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      <p className="text-2xl text-gray-900">{user.username}</p>
                      <span
                        className="bg-purple-500 rounded-full p-1"
                        title="Verified"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-gray-100 h-2.5 w-2.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="4"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <p className="text-gray-500">{user.profile}</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                    <div className="flex items-center space-x-4 mt-2">
                      <button
                        onClick={openModal}
                        className="flex items-center bg-purple-800 hover:bg-purple-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                            clipRule="evenodd"
                          />
                          <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
                          <path
                            fillRule="evenodd"
                            d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <span>Update Password</span>
                      </button>
                      <Modal
                        isOpen={isOpen}
                        onRequestClose={closeModal}
                        className="modal flex items-center justify-center"
                      >
                        <div className="mt-5 bg-white p-4 rounded-md max-w-sm">
                          <div className="w-full">
                            <h2 className="text-lg font-bold mb-4">
                              Update Password
                            </h2>
                            <form onSubmit={handleFormSubmit}>
                              <label htmlFor="oldPassword">Old Password:</label>
                              <input
                                type={showPassword ? "text" : "password"}
                                id="oldPassword"
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="border border-gray-300 p-2 mb-4 rounded-md w-full"
                              />
                              <label htmlFor="newPassword">New Password:</label>
                              <div className="relative">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  id="newPassword"
                                  required
                                  value={newPassword}
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                  className="border border-gray-300 p-2 mb-2 rounded-md w-full"
                                />
                                <button
                                  type="button"
                                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400"
                                  onClick={togglePasswordVisibility}
                                >
                                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                              <label htmlFor="confirmPassword">
                                Confirm Password:
                              </label>
                              <div className="relative">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  id="confirmPassword"
                                  required
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                  className="border border-gray-300 p-2 mb-4 rounded-md w-full"
                                />
                                <button
                                  type="button"
                                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400"
                                  onClick={togglePasswordVisibility}
                                >
                                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                              <div className="flex justify-between">
                                <button
                                  type="submit"
                                  className="bg-blue-700 text-white py-2 px-4 rounded-md"
                                >
                                  Update
                                </button>
                                <button
                                  type="button"
                                  className="bg-red-600 text-white py-2 px-4 rounded-md mr-2"
                                  onClick={closeModal}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Modal>

                      {/* <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <span>Message</span>
                      </button> */}
                    </div>
                  </div>
                </div>

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                  <div className="w-full flex flex-col 2xl:w-1/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                      <h4 className="text-xl text-gray-900 font-bold">
                        Personal Info
                      </h4>
                      <ul className="mt-2 text-gray-700">
                        <li className="flex border-y py-2">
                          <span className="font-bold w-24">Full name:</span>
                          <span className="text-gray-700">{user.username}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Profile:</span>
                          <span className="text-gray-700">{user.profile}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Role</span>
                          <span className="text-gray-700">{user.role}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">userID</span>
                          <span className="text-gray-700">{user.userID}</span>
                        </li>
                      </ul>

                      <div className="relative ">
                        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                        <div className="bg-white p-3 hover:shadow">
                          <div className="flex items-center font-semibold text-gray-900 text-xl leading-8">
                            <span className="text-purple-500">
                              <svg
                                className="h-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                            </span>
                            <span>Similar Roles</span>
                          </div>
                          <div className="container mr-5 ml-2 mx-auto bg-white ">
                            <div className="w-11/12 mx-auto">
                              <div className="bg-white my-6">
                                <table className="text-left w-full border-collapse">
                                  <thead>
                                    <tr>
                                      <th className="py-4 px-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border-b border-grey-light">
                                        Name
                                      </th>
                                      <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border-b border-grey-light">
                                        Profile
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {similarProfiles.map((profile: any) => (
                                      <tr
                                        className="hover:bg-grey-lighter"
                                        key={profile.id}
                                      >
                                        <td className="py-4 px-6 border-b text-blue-700 border-grey-light">
                                          <a href={`/user/${profile.username}`}>
                                            {profile.username}
                                          </a>
                                        </td>
                                        <td className="py-4 px-6 text-center border-b border-grey-light">
                                          {profile.profile}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                      <h4 className="text-xl text-gray-900 font-bold">
                        All Notifications
                      </h4>
                      <div className="relative px-4">
                        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

                        <div className="flex items-center w-full my-6 -ml-1.5">
                          <div className="w-1/12 z-10">
                            <div className="w-3.5 h-3.5 bg-purple-500  rounded-full"></div>
                          </div>
                          <div className="w-11/12">
                            <p className="text-sm">
                              Profile informations changed.
                            </p>
                            <p className="text-xs text-gray-500">3 min ago</p>
                          </div>
                        </div>
                        <div className="flex items-center w-full my-6 -ml-1.5">
                          <div className="w-1/12 z-10">
                            <div className="w-3.5 h-3.5 bg-purple-500  rounded-full"></div>
                          </div>
                          <div className="w-11/12">
                            <p className="text-sm">
                              Connected with{" "}
                              <a href="#" className="text-blue-600 font-bold">
                                Colby Covington
                              </a>
                              .
                            </p>
                            <p className="text-xs text-gray-500">15 min ago</p>
                          </div>
                        </div>
                        <div className="flex items-center w-full my-6 -ml-1.5">
                          <div className="w-1/12 z-10">
                            <div className="w-3.5 h-3.5 bg-purple-500  rounded-full"></div>
                          </div>
                          <div className="w-11/12">
                            <p className="text-sm">
                              Invoice{" "}
                              <a href="#" className="text-blue-600 font-bold">
                                #4563
                              </a>{" "}
                              was created.
                            </p>
                            <p className="text-xs text-gray-500">57 min ago</p>
                          </div>
                        </div>
                        <div className="flex items-center w-full my-6 -ml-1.5">
                          <div className="w-1/12 z-10">
                            <div className="w-3.5 h-3.5 bg-purple-500  rounded-full"></div>
                          </div>
                          <div className="w-11/12">
                            <p className="text-sm">
                              Message received from{" "}
                              <a href="#" className="text-blue-600 font-bold">
                                Cecilia Hendric
                              </a>
                              .
                            </p>
                            <p className="text-xs text-gray-500">1 hour ago</p>
                          </div>
                        </div>
                        <div className="flex items-center w-full my-6 -ml-1.5">
                          <div className="w-1/12 z-10">
                            <div className="w-3.5 h-3.5 bg-purple-500  rounded-full"></div>
                          </div>
                          <div className="w-11/12">
                            <p className="text-sm">
                              New order received{" "}
                              <a href="#" className="text-blue-600 font-bold">
                                #OR9653
                              </a>
                              .
                            </p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>

                        <div className="flex items-center w-full my-6 -ml-1.5">
                          <div className="w-1/12 z-10">
                            <div className="w-3.5 h-3.5 bg-purple-500  rounded-full"></div>
                          </div>
                          <div className="w-11/12">
                            <p className="text-sm">
                              Message received from{" "}
                              <a href="#" className="text-blue-600 font-bold">
                                Jane Stillman
                              </a>
                              .
                            </p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8"></div>
                  </div>
                  <div className="flex flex-col w-full 2xl:w-2/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                      <h4 className="text-xl text-gray-900 font-bold">
                        Statistics
                      </h4>
                      <div className="">
                        <AdminStatistique />
                      </div>

                      <div>
                        <div>
                          <div>
                            <h4 className="mt-3 text-xl text-gray-900 font-bold">
                              Activities
                            </h4>
                            {user.profile === "Product Offering Manager" ? (
                              <div>
                                <div className="bg-white my-6 mx-auto">
                                  <table className="text-left w-full border-collapse">
                                    <thead>
                                      <tr>
                                        <th className="py-4 px-6 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border-b border-grey-light">
                                          ID
                                        </th>
                                        <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border-b border-grey-light">
                                          NUMBER
                                        </th>
                                        <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border-b border-grey-light">
                                          NAME
                                        </th>
                                        <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border-b border-grey-light">
                                          STATE
                                        </th>
                                        <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border-b border-grey-light">
                                          CONTRACT TERM
                                        </th>
                                        <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border-b border-grey-light">
                                          START DATE
                                        </th>
                                        <th className="py-4 px-6 text-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-400  font-bold uppercase text-sm text-white border-b border-grey-light">
                                          END DATE
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="hover:bg-grey-lighter">
                                        <td className="py-4 px-6 border-b border-grey-light"></td>
                                        <td className="py-4 px-6 text-center border-b border-grey-light"></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            ) : user.profile === "Commercial Agent" ? (
                              <div className="bg-white my-6 mx-auto">
                                <table className="text-left w-full border-collapse">
                                  <thead>
                                    <tr>
                                      <th className="py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                                        ID
                                      </th>
                                      <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                                        NUMBER
                                      </th>
                                      <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                                        STATE
                                      </th>
                                      <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                                        ORDER DATE
                                      </th>
                                      <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                                        PRODUCT OFFERING
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="hover:bg-grey-lighter">
                                      <td className="py-4 px-6 border-b border-grey-light"></td>
                                      <td className="py-4 px-6 text-center border-b border-grey-light"></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            ) : user.profile === "Administrator" ? (
                              <div className="flex flex-col p-2">
                                <div className="py-12 chart-container bg-white">
                                  <div className=" flex w-full">
                                    <div className="w-1/2  rounded-lg shadow-xl p-8">
                                      <LineChart />
                                      <p className="mt-2 text-gray-600 font-semibold text-center">
                                        Completed Orders by Day
                                      </p>
                                    </div>
                                    <div className=" mx-2 w-1/2  rounded-lg shadow-xl p-8">
                                      <BarChart />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-wrap mt-4">
                                  <div className="w-1/2">
                                    <div className="py-12 chart-container bg-white rounded-lg shadow-xl p-8">
                                      <DoughnutChart />
                                    </div>
                                  </div>
                                  <div className="w-1/2">
                                    <div className="mx-3 h-full rounded-lg shadow-xl p-8">
                                      <PieChart />
                                      <p className="mt-2 text-gray-600 font-semibold text-center">
                                        Users{" "}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-xl p-8"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
