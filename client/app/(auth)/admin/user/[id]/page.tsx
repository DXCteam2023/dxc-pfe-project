"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../../dashboard/components/Sidebar";
import Header from "../../../dashboard/components/Header";
import Image from "next/image";
import watch from "../../../../../public/assets/watch.png";
import couver from "../../../../../public/assets/couver.jpeg";
import avatar from "../../../../../public/assets/avatar.png";
const Page = ({ params }: { params: { id: string; profile: string } }) => {
  const [user, setUser] = useState<any>(null);
  const [similarProfiles, setSimilarProfiles] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const id = params.id;
      const response = await axios.get(`http://localhost:5000/api/user/${id}`);
      const userData = response.data;
      setUser(userData);
      console.log(userData);

      const profile = userData.profile;
      const similarProfilesResponse = await axios.get(
        `http://localhost:5000/api/user/similar-profile/${profile}`,
      );
      const similarProfilesData = similarProfilesResponse.data;
      setSimilarProfiles(similarProfilesData);
      console.log("hello", similarProfilesData);
    } catch (error) {
      console.error("Error while fetching users:", error);
    }
  }

  return (
    <div className="user">
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white min-h-screen-100 w-5/6">
          <Header />
          {user && (
            <div>
              {/* <h2>Nom de l'utilisateur : {user.username}</h2>
                <h3>Profil de l'utilisateur : {user.profile}</h3> */}
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
                  {/* <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                <div className="flex items-center space-x-4 mt-2">
                    <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                        </svg>
                        <span>Connect</span>
                    </button>
                    <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                        </svg>
                        <span>Message</span>
                    </button>
                </div>
            </div> */}
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
                      <div className=" mt-2 relative mx-auto bg-purple-800  rounded-t-[2.5rem] h-[63px] max-w-[133px]"></div>
                      <div className="relative mx-auto border-purple-900  border-[10px] rounded-[2.5rem] h-[213px] w-[208px]">
                        <div className="h-[41px] w-[6px] bg-purple-800  absolute -right-[16px] top-[40px] rounded-r-lg"></div>
                        <div className="h-[32px] w-[6px] bg-purple-800 absolute -right-[16px] top-[88px] rounded-r-lg"></div>
                        <div className="rounded-[2rem] overflow-hidden h-[193px] w-[188px]">
                          <Image
                            src={watch}
                            className="dark:hidden h-[193px] w-[188px "
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="relative mx-auto bg-purple-800 dark:bg-gray-700 rounded-b-[2.5rem] h-[63px] max-w-[133px]"></div>
                    </div>
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
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
                            <span>Similar Profiles</span>
                          </div>
                          <div className="container mr-5 ml-2 mx-auto bg-white shadow-xl">
                            <div className="w-11/12 mx-auto">
                              <div className="bg-white my-6">
                                <table className="text-left w-full border-collapse">
                                  <thead>
                                    <tr>
                                      <th className="py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                                        Name
                                      </th>
                                      <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
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
                                        <td className="py-4 px-6 border-b border-grey-light">
                                          {profile.username}
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
                  </div>
                  <div className="flex flex-col w-full 2xl:w-2/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                      <h4 className="text-xl text-gray-900 font-bold">
                        Statistics
                      </h4>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                        <div className="px-6 py-6 bg-white border border-white rounded-lg shadow-xl">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-indigo-600">
                              Total Service Orders
                            </span>
                            <span className="text-xs bg-blue-500 hover:bg-blue-400 text-white hover:text-white px-2 py-1 rounded-lg transition duration-200 cursor-default">
                              7 days
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-6">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-7 w-7 text-blue-500"
                              >
                                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                                <path
                                  fillRule="evenodd"
                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-end">
                                <span className="text-2xl 2xl:text-3xl font-bold">
                                  $8,141
                                </span>
                                <div className="flex items-center ml-2 mb-1">
                                  <svg
                                    className="w-5 h-5 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    ></path>
                                  </svg>
                                  <span className="font-bold text-sm text-gray-500 ml-0.5">
                                    3%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="px-6 py-6 bg-white border border-white rounded-lg shadow-xl">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-green-600">
                              Total Product Orders Orders
                            </span>
                            <span className="text-xs bg-green-500 hover:bg-green-400 text-white hover:text-white px-2 py-1 rounded-lg transition duration-200 cursor-default">
                              7 days
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-6">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 text-green-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-end">
                                <span className="text-2xl 2xl:text-3xl font-bold">
                                  217
                                </span>
                                <div className="flex items-center ml-2 mb-1">
                                  <svg
                                    className="w-5 h-5 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    ></path>
                                  </svg>
                                  <span className="font-bold text-sm text-gray-500 ml-0.5">
                                    5%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-6 py-6 bg-white border border-white rounded-lg shadow-xl">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-blue-600">
                             Total Product Offerings
                            </span>
                            <span className="text-xs bg-purple-500 hover:bg-purple-400 text-white hover:text-white px-2 py-1 rounded-lg transition duration-200 cursor-default">
                              7 days
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-6">
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7 text-pink-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-end">
                                <span className="text-2xl 2xl:text-3xl font-bold">
                                  54
                                </span>
                                <div className="flex items-center ml-2 mb-1">
                                  <svg
                                    className="w-5 h-5 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    ></path>
                                  </svg>
                                  <span className="font-bold text-sm text-gray-500 ml-0.5">
                                    7%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
              <th className="py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                ID
              </th>
              <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                NUMBER
              </th>
              <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                NAME
              </th>
              <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                STATE
              </th>
              <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                CONTRACT TERM
              </th>
              <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                START DATE
              </th>
              <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
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
  ) : null}
</div>
  {/* <div className="mt-4">
    <canvas
      id="verticalBarChart"

                          {/* <div className="mt-4">
                        <canvas
                          id="verticalBarChart"
                          width="1656"
                          height="828"
                        ></canvas>
                      </div> */}
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
