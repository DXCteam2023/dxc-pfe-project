"use client";
import React, { useState, useEffect, Fragment } from "react";
import ReactModal from "react-modal";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import avatar from "../../../../../public/assets/avatar.png";
import dataProductOfferings from "../../data/dataProductOfferings";
import dataCostumerOrders from "../../data/dataCostumerOrders";

// Importing types
import { TDataCustomerOrder, TDataProductOffering } from "./types";

// Importin utility funtions
import { handleLogout, handleSearchClick } from "./utils";

export async function getStaticProps() {
  return {
    props: {
      dataProductOfferings: dataProductOfferings,
    },
  };
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [localToken, setLocalToken] = useState("");
  const [localUser, setLocalUser] = useState(JSON.stringify({}));
  useEffect(() => {
    let token;
    let user;
    // Get the value from local storage if it exists
    token = localStorage.getItem("token") || "";
    setLocalToken(token);

    user = localStorage.getItem("user") || "";
    setLocalUser(user);
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<TDataProductOffering[]>(
    [],
  );
  const [customerResults, setCustomerResults] = useState<TDataCustomerOrder[]>(
    [],
  );

  /*search  by term testing*/
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="flex justify-between items-center px-5 py-5 bg-white relative">
      {/* Champ de modal & form */}
      <div className="w-5/6 ">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            handleSearchClick(e, {
              setPopupOpen,
              dataCostumerOrders,
              searchTerm,
              setCustomerResults,
              dataProductOfferings,
              setSearchResults,
            })
          }
        >
          <ReactModal
            isOpen={isPopupOpen}
            onRequestClose={handlePopupClose}
            className="bg-black bg-opacity-60 h-full     justify-center  border-0"
          >
            {" "}
            <div className="results">
              <button
                className="absolute top-5 right-5 text-gray-600 hover:text-gray-800"
                onClick={handlePopupClose}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="red"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              {/*Result Product Offerings  by word  */}

              {searchResults.map((result) => {
                return (
                  <div>
                    <div
                      key={result.number}
                      className=" w-full flex  bg-black bg-opacity-60 px-4 lg:p-5 overflow-hidden relative "
                    >
                      <div className="w-full max-w-6xl rounded bg-white shadow-xl p-6 lg:p-6 mx-auto text-gray-800 relative ms:text-left">
                        <div className="sm:flex  sm:justify-between sm:space-x-5">
                          <div className="flex items-center flex-1 min-w-0">
                            <Image
                              src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/SlackLogo_CompanyNews_SecondaryAubergine_Hero.jpg?d=500x500&amp;f=fill"
                              className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"
                              alt="image"
                            />
                            <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                              <p className="text-lg font-bold text-gray-800 truncate">
                                <a
                                  className="underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {result.display_name}
                                </a>
                              </p>
                              <div className="w-full max-w-6xl rounded bg-white shadow-xl p-6 lg:p-6 mx-auto text-gray-800 relative ms:text-left">
                                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                  <div className="flex items-center flex-1 min-w-0">
                                    <Image
                                      src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/SlackLogo_CompanyNews_SecondaryAubergine_Hero.jpg?d=500x500&amp;f=fill"
                                      className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"
                                      alt="image"
                                    />
                                    <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                                      <p className="text-gray-600 text-md">
                                        {result.number}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                                    <a
                                      href=""
                                      className="bg-gray-800 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all
                                            duration-200 hover:bg-gray-700 rounded-lg"
                                    >
                                      View Product
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/*Result costumer orders by word*/}
            <div className="bg-black bg-opacity-60 flex items-center p-5 lg:p-2 overflow-hidden relative">
              {customerResults.map((result) => (
                <div
                  key={result.number}
                  className="bg-white flex items-center p-5 lg:p-2 overflow-hidden relative"
                >
                  <div className="w-full max-w-6xl rounded bg-white shadow-xl p-6 lg:p-6 mx-auto text-gray-800 relative ms:text-left">
                    <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                      <div className="flex items-center flex-1 min-w-0">
                        <Image
                          src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/SlackLogo_CompanyNews_SecondaryAubergine_Hero.jpg?d=500x500&amp;f=fill"
                          className="flex-shrink-0 object-cover rounded-full btn- w-10 h-10"
                          alt="Profile"
                        />
                        <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                          <p className="text-lg font-bold text-gray-800 truncate">
                            {result.category}
                          </p>
                          <p className="text-gray-600 text-md">
                            {result.number}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0">
                        <a
                          href=""
                          className="bg-gray-800 pt-2 pr-6 pb-2 pl-6 text-lg font-medium text-gray-100 transition-all duration-200 hover:bg-gray-700 rounded-lg"
                        >
                          View Order
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ReactModal>
          <div
            className={`relative overflow-hidden border ${
              isInputFocused ? "border-purple-500" : "border-purple-300"
            }`}
          >
            <div className="inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
            <input
              type="search"
              id="search"
              className={`shadow-md block w-full p-3 pl-10 text-sm text-gray-900 bg-white-50 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isInputFocused ? "border-none" : "border"
              }`}
              placeholder=" Quick Search"
              required
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </form>
      </div>

      <button
        id="dropdownNotificationButton"
        data-dropdown-toggle="dropdownNotification"
        className="inline-flex items-center w-11 h-11   p-2 bg-green text-white-400 align-middle rounded-full hover:text-white hover:bg-purple-200 focus:outline-nonerounded-full text-sm font-medium text-center  focus:outline-none relative"
        type="button"
        onClick={handleDropdownToggle}
      >
        <svg
          className="w-6 h-6 mx-auto bg-green"
          aria-hidden="true"
          fill="purple"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
          20
        </div>
      </button>
      {/* Dropdown de notification */}

      {isDropdownOpen && (
        <div
          id="dropdownNotification"
          // className="z-20 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700 transition ease-out duration-100"
          className="fixed right-20 top-20 z-20 "
          aria-labelledby="dropdownNotificationButton"
        >
          <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 ">
            Notifications
          </div>

          <div className="divide-y divide-gray-100 bg-white">
            <a href="#" className="flex px-4 py-3 hover:bg-gray-100 ">
              hello
            </a>
            {/* Plus d'éléments de notification... */}
          </div>

          <a
            href="#"
            className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 "
          >
            <div className="inline-flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              View all
            </div>
          </a>
        </div>
      )}

      {/* Photo de profil */}
      <div className="">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex  w-10 h-10 rounded-full justify-center gap-x-1.5">
              <Image
                className="hidden h-10 w-10 rounded-full sm:block object-cover mr-2 border-4 border-purple-700"
                src={avatar}
                alt="Bonnie image"
              />
              <ChevronDownIcon
                className="-mr-1 h-12 w-5 text-purple-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm",
                      )}
                    >
                      Account settings
                    </a>
                  )}
                </Menu.Item>
                <form method="POST" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="submit"
                        onClick={handleLogout}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm",
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
