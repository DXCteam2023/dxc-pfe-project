import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const AXIOS_URL = process.env.NEXT_PUBLIC_AXIOS_URL;

const Cards = () => {
  const [users, setUsers] = useState([]);

  type User = {
    profile: string;
  };

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get(`${AXIOS_URL}/api/user`);
        const usersData = response.data;
        setUsers(usersData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs:",
          error,
        );
      }
    }
    getUsers();
  }, []);

  const totalUsers = users.length;
  // console.log(totalUsers);
  const managers = users.filter(
    (manager: User) => manager.profile === "Product Offering Manager",
  );
  const totalManagers = managers.length;
  // console.log(totalManagers);
  const agents = users.filter(
    (agent: User) => agent.profile === "Commercial Agent",
  );
  const totalAgents = agents.length;

  return (
    <div>
      <div className="flex flex-wrap my-5 -mx-2">
        <div className="w-full lg:w-1/3 p-2">
          <div className="flex items-center flex-row w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md p-3">
            <div className="flex text-indigo-500 items-center bg-white p-2 rounded-md flex-none w-8 h-8 md:w-12 md:h-12 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="object-scale-down transition duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-around flex-grow ml-5 text-white">
              <div className="text-xs whitespace-nowrap">Total User</div>
              <div className="">{totalUsers}</div>
            </div>
            <div className=" flex items-center flex-none text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="object-scale-down transition duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-2 ">
          <div className="flex items-center flex-row w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md p-3">
            <div className="flex text-indigo-500 items-center bg-white p-2 rounded-md flex-none w-8 h-8 md:w-12 md:h-12 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="object-scale-down transition duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-around flex-grow ml-5 text-white">
              <div className="text-xs whitespace-nowrap">
                Total Product Offering Managers
              </div>
              <div className="">{totalManagers}</div>
            </div>
            <div className=" flex items-center flex-none text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="object-scale-down transition duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-2">
          <div className="flex items-center flex-row w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md p-3">
            <div className="flex text-indigo-500 items-center bg-white p-2 rounded-md flex-none w-8 h-8 md:w-12 md:h-12 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="object-scale-down transition duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-around flex-grow ml-5 text-white">
              <div className="text-xs whitespace-nowrap">
                Total Commercial agents
              </div>
              <div className="">{totalAgents}</div>
            </div>
            <div className=" flex items-center flex-none text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="object-scale-down transition duration-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
