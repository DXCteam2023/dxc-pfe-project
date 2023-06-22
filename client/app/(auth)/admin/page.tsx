"use client";
import React, {
  useState,
  useEffect,
  SyntheticEvent,
  ChangeEvent,
  useRef,
} from "react";
import Form from "./form";
import Sidebar from "../dashboard/components/Sidebar";
import Header from "../dashboard/components/header/Header";

import Table from "./table";
import Cards from "./Cards";

const Page = () => {
  const [visible, setVisible] = useState(false);
  const handler = () => {
    setVisible(!visible);
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
            <Cards />
            {visible ? (
              <button
                className="text-sm bg-red-700 hover:bg-red-400 text-white font-semibold py-2 px-8 rounded-r flex items-end transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300items-end"
                onClick={handler}
              >
                Cancel
              </button>
            ) : (
              <button
                className="text-sm bg-purple-700 hover:bg-purple-400 text-white font-semibold py-2 px-8 rounded-r flex items-end transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300items-end"
                onClick={handler}
              >
                New{" "}
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
          {/* collapsable form*/}
          {visible ? (
            <div className="">
              {" "}
              <Form></Form>
            </div>
          ) : (
            <></>
          )}
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Page;
