"use client";
import React, {
  useState,
  useEffect,
  SyntheticEvent,
  ChangeEvent,
  useRef,
} from "react";
import Modal from "react-modal";
import Image from "next/image";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Form from "./form";
import Sidebar from "../dashboard/components/Sidebar";
import Header from "../dashboard/components/header/Header";
import Footer from "../dashboard/components/Footer";
import couver from "../../../public/assets/couverture.jpeg";
import avatar from "../../../public/assets/avatar.png";
import Table from "./table";
import Cards from "./Cards";
import PiChart from "./user/[id]/PiChart";
import DoughnutChart from "./user/[id]/ChartCercle";
import AdminStatistique from "./user/[id]/AdminStats";
import OrdersByAgents from "./user/[id]/OrdersByAgents";

const Page = () => {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [percent, setPercent] = useState<number>();
  const [percentOrders, setPercentOrders] = useState<number>(0);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibleStat, setVisibleStat] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handler = () => {
    setVisible(!visible);
  };
  const HandStat = () => {
    setVisibleStat(!visibleStat);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  // const updateUserPassword = async () => {
  //   try {
  //     console.log(user._id);
  //     const response = await axios.patch(`${AXIOS_URL}/api/user/${user?._id}`, {
  //       userId: user._id,
  //       oldPassword,
  //       newPassword,
  //     });
  //     if (response.status === 200) {
  //       Swal.fire({
  //         icon: "success",
  //         text: response.data.message,
  //       });
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("user");
  //       setTimeout(() => {
  //         window.location.href = "/login";
  //       }, 2000);
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         text: "An error occurred while changing the password ",
  //       });
  //     }
  //   } catch (error: any) {
  //     Swal.fire({
  //       icon: "error",
  //       text: `An error occurred while changing the password :  ${error.response.data.message}`,
  //     });
  //   }
  // };

  // const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (newPassword !== confirmPassword) {
  //     Swal.fire({
  //       icon: "error",
  //       text: "The passwords are different",
  //     });
  //     return;
  //   }
  //   updateUserPassword();
  // };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showAddForm, setShowAddForm] = useState(false);
  return (
    <div>
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white  min-h-screen-100 w-5/6">
          <Header />
          <div className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
            <nav
              className="flex px-5 py-3 text-gray-700  rounded-lg bg-gray-50"
              aria-label="Breadcrumb"
            >
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Dashboard
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <a
                      href="#"
                      className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2"
                    >
                      Manage Users
                    </a>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="bg-white rounded-lg shadow-xl pb-8">
              <Cards />
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
                  <p className="text-2xl text-gray-900">Administrator</p>
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
              </div>
              <AdminStatistique />
              <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    className={`text-sm ${
                      visibleStat
                        ? "bg-red-700 hover:bg-red-600"
                        : "bg-yellow-400 hover:bg-yellow-500"
                    } text-white font-semibold py-2 px-8 rounded-r flex items-end`}
                    onClick={HandStat}
                  >
                    {visibleStat ? "Hide Statistics" : "Show Statistics"}
                    {visibleStat && <span className="px-2"></span>}
                  </button>

                  <button
                    onClick={openModal}
                    className="flex items-center bg-orange-500 hover:bg-orange-400 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
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
                  <Modal isOpen={isOpen} onRequestClose={closeModal}>
                    <div className="mt-5 bg-white p-4 rounded-md max-w-sm">
                      <div className="w-full">
                        <h2 className="text-lg font-bold mb-4">
                          Update Password
                        </h2>
                        <form>
                          <label htmlFor="oldPassword">Old Password:</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="oldPassword"
                              required
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              className="border border-gray-300 p-2 mb-4 rounded-md w-full"
                            />
                            <button
                              type="button"
                              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400"
                              // onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                          <label htmlFor="newPassword">New Password:</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="newPassword"
                              required
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="border border-gray-300 p-2 mb-2 rounded-md w-full"
                            />
                            <button
                              type="button"
                              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400"
                              // onClick={togglePasswordVisibility}
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
                              // onClick={togglePasswordVisibility}
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

                  {visible ? (
                    <button
                      className="text-sm bg-red-700 hover:bg-red-400 text-white font-semibold py-2 px-8 rounded-r flex items-end"
                      onClick={handler}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      className="text-sm bg-indigo-700 hover:bg-indigo-500 text-white font-semibold py-2 px-8 rounded-r flex items-end "
                      onClick={handler}
                    >
                      Add New
                      <span className="px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-6 h-6 mr-2"
                        >
                          <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                        </svg>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {visibleStat && (
              <div className="flex flex-wrap mt-4">
                <div className="w-1/3">
                  <div className="py-12 chart-container bg-white rounded-lg shadow-xl p-8">
                    <DoughnutChart />
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="mx-3 h-full rounded-lg shadow-xl p-8">
                    <PiChart />
                    <p className="mt-2 text-gray-600 font-semibold text-center">
                      Users Categories
                    </p>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="mx-3 h-full rounded-lg shadow-xl p-8">
                    <OrdersByAgents />
                  </div>
                </div>
              </div>
            )}
          </div>
          {visible ? (
            <div className="">
              {" "}
              <Form></Form>
            </div>
          ) : (
            <></>
          )}
          <Table />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;
