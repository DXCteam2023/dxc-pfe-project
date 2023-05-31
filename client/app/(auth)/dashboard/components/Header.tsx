"use client";
import React, { useState } from "react";
import ReactModal from "react-modal";
import photo from "@/public/assets/dev3.jpg";
import Image from "next/image";
import axios from "axios";
import { dataProductOfferings } from "../data/dataProductOfferings";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState<dataProductOfferings[]>(
        [],
    );
    interface dataProductOfferings {
        number: string;
        display_name: string;
        version: string;
        state: string;
        price: string;
        description: string;
        Contract_terms: string;
        start_date: string;
        end_date: string;
    }
    const handleSearchClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPopupOpen(true);
        const results = dataProductOfferings.filter((product) => {
            return product.display_name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
        });
        setSearchResults(results);
        console.log("result", results);

        {
            /*setSearchResults(results);*/
        }
        setPopupOpen(true);
    };

    const handleSearch = (value: string) => {
        setSearchValue(value);
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
        <div className="flex justify-between items-center px-4 py-4 bg-white relative">
            {/* Champ de recherche */}
            <div className="w-5/6">
                <form onSubmit={handleSearchClick}>
                    <ReactModal
                        isOpen={isPopupOpen}
                        onRequestClose={handlePopupClose}
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
                                    stroke="currentColor"
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
                            {searchResults.map((result) => (
                                <div
                                    key={result.number}
                                    className=" bg-white flex items-center animation-pulse p-5 lg:p-10 overflow-hidden relative"
                                >
                                    <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
                                        <button
                                            className="absolute top-5 right-5 text-gray-600 hover:text-gray-800"
                                            onClick={handlePopupClose}
                                        >
                                            <svg
                                                className="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
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

                                        <div className="md:flex items-center -mx-10">
                                            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                                                <div className="relative">
                                                    <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2 px-10">
                                                <div className="mb-10">
                                                    <h2 className="font-bold uppercase text-l mb-5">
                                                        {result.number}
                                                    </h2>
                                                    <h1 className="font-bold uppercase text-2xl mb-5">
                                                        {result.display_name}
                                                    </h1>
                                                    <p className="text-sm">
                                                        Contract Terms :
                                                        {result.Contract_terms}
                                                    </p>
                                                    <p className="text sm">
                                                        {result.description}
                                                    </p>
                                                </div>
                                                <div>
                                                    <div className="inline-block align-bottom mr-5">
                                                        <span className="text-2xl leading-none align-baseline">
                                                            $
                                                        </span>
                                                        <span className="font-bold text-5xl leading-none align-baseline">
                                                            {result.price}
                                                        </span>
                                                        <span className="text-2xl leading-none align-baseline">
                                                            .99
                                                        </span>
                                                    </div>
                                                    <div className="inline-block align-bottom">
                                                        <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold">
                                                            <i className="mdi mdi-cart -ml-2 mr-2"></i>{" "}
                                                            VIEW DETAILS
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ReactModal>
                    <div
                        className={`relative rounded-full overflow-hidden border ${
                            isInputFocused
                                ? "border-purple-500"
                                : "border-gray-300"
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
                            onChange={(
                                event: React.FormEvent<HTMLInputElement>,
                            ) => handleSearch(event.currentTarget.value)}
                        />
                    </div>
                </form>
            </div>

            {/* Icône de notification */}
            <button
                id="dropdownNotificationButton"
                data-dropdown-toggle="dropdownNotification"
                className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none "
                type="button"
                onClick={handleDropdownToggle}
            >
                <svg
                    className="w-6 h-6"
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
                        <a
                            href="#"
                            className="flex px-4 py-3 hover:bg-gray-100 "
                        >
                            hello
                            {/* ... */}
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
                        <Menu.Button className="inline-flex  w-10 h-10 rounded-full  w-full justify-center gap-x-1.5 rounded-md ">
                            <Image
                                className="w-10 h-10 rounded-full  shadow-lg"
                                src={photo}
                                alt="Bonnie image"
                            />
                            <ChevronDownIcon
                                className="-mr-1 h-12 w-5 text-gray-400"
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
                                                active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
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
