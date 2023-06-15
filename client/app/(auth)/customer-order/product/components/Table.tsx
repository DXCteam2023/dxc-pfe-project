"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiEye, FiFilter, FiSearch, FiTrash2 } from "react-icons/fi";
import Modal from "react-modal";
import Link from "next/link";
import {
  FaPencilAlt,
  FaRegWindowClose,
  FaSortAmountDownAlt,
} from "react-icons/fa";
import NoRecord from "@/public/assets/NoRecord.png";
import dataProductOrders from "../data/dataProductOrders";

type ProductOrder = {
  id: number;
  Number: string;
  state: string;
  TaskType: string;
  Priority: string;
  Shortdescription: string;
  AssignedTo: string;
  Created: Date;
  OrderLineItem: string;
  Account: string;
};

const Table = () => {
  const [filter, setFilter] = useState<ProductOrder[]>(dataProductOrders);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [searchText, setSearchText] = useState<string>("");
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const filterProductOrdersByState = (state: string) => {
    if (state === "all") {
      setFilter(dataProductOrders);
    } else {
      const updatedList = dataProductOrders.filter(
        (order) => order.state === state,
      );
      setFilter(updatedList);
    }
  };

  const filterProductOrdersByPriority = (priority: string) => {
    if (priority === "all") {
      setFilter(dataProductOrders);
    } else {
      const updatedList = dataProductOrders.filter(
        (order) => order.Priority === priority,
      );
      setFilter(updatedList);
    }
  };

  const sortProductOrdersByCreated = (order: string) => {
    const sortedList = [...filter].sort((a, b) => {
      if (order === "asc") {
        return new Date(a.Created).getTime() - new Date(b.Created).getTime();
      } else {
        return new Date(b.Created).getTime() - new Date(a.Created).getTime();
      }
    });

    setSortOrder(order);
    setFilter(sortedList);
  };

  const searchProductOrders = (text: string) => {
    setSearchText(text);
    const filteredList = dataProductOrders.filter((order) => {
      const searchFields = `${order.Number} ${order.state} ${order.TaskType} ${order.Priority} ${order.AssignedTo} ${order.Shortdescription}`;
      return searchFields.toLowerCase().includes(text.toLowerCase());
    });
    setFilter(filteredList);
  };

  const sortProductOrdersByPriority = () => {
    const priorityOrder = ["Critical", "High", "Moderate", "Low", "Planning"];

    const sortedList = [...dataProductOrders].sort((a, b) => {
      const priorityA = priorityOrder.indexOf(a.Priority);
      const priorityB = priorityOrder.indexOf(b.Priority);

      return priorityA - priorityB;
    });

    setFilter(sortedList);
  };

  const handleOrderClick = (orderId: number) => {
    setSelectedOrderId(orderId);
    setModalIsOpen(true);
  };

  // Le nombre total de pages
  const totalPages = Math.ceil(filter.length / itemsPerPage);

  // l'index de la première et de la dernière ligne à afficher
  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;

  // Obtenir les lignes à afficher sur la page actuelle
  const currentRows = filter.slice(indexOfFirstRow, indexOfLastRow);

  // Fonction pour passer à la page suivante
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Fonction pour passer à la page précédente
  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const date = new Date("2023-09-30T00:00:00.000Z");
  const formattedDate = date.toISOString().split("T")[0];
  console.log(formattedDate);
  // Confirm message

  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleDelete = () => {
    console.log("Suppression effectuée !");
  };

  const handleClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = () => {
    setShowConfirmation(false);
    handleDelete();
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };
  return (
    <div className="flex w-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className="ml-2 flex mt-2 shadow-lg shadow-gray-500 md:shadow-1/2xl md:shadow-gray-500">
            <div className="container mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <h1 className=" mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Product customer orders
                  </h1>

                  <div className="search-bar">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchText}
                      onChange={(e) => searchProductOrders(e.target.value)}
                      className="search-input"
                    />
                    <FiSearch size={20} className="search-icon" />
                  </div>
                  <button className="btn">
                    <a onClick={() => filterProductOrdersByPriority("all")}>
                      All
                    </a>
                  </button>
                  <Link href="/customer-order/all/product/Form">
                    <button className="btn">NEW</button>
                  </Link>

                  <div className="dropdown">
                    <button className="dropbtn">
                      <FiFilter size={20} color="white" />
                    </button>
                    <div className="dropdown-content">
                      <div className="submenu">
                        <a href="#">State</a>
                        <div className="submenu-content">
                          <a
                            onClick={() =>
                              filterProductOrdersByState("closed complete")
                            }
                          >
                            Closed Complete
                          </a>
                          <a
                            onClick={() =>
                              filterProductOrdersByState("Canceled")
                            }
                          >
                            Canceled
                          </a>
                          <a
                            onClick={() =>
                              filterProductOrdersByState("On Hold")
                            }
                          >
                            On Hold
                          </a>
                          <a
                            onClick={() =>
                              filterProductOrdersByState("In Progress")
                            }
                          >
                            In Progress
                          </a>
                          <a
                            onClick={() =>
                              filterProductOrdersByState("Scheduled")
                            }
                          >
                            Scheduled
                          </a>
                        </div>
                      </div>
                      <div className="submenu">
                        <a href="#">Priority</a>
                        <div className="submenu-content">
                          <a
                            onClick={() =>
                              filterProductOrdersByPriority("Critical")
                            }
                          >
                            Critical
                          </a>
                          <a
                            onClick={() =>
                              filterProductOrdersByPriority("High")
                            }
                          >
                            High
                          </a>
                          <a
                            onClick={() =>
                              filterProductOrdersByPriority("Moderate")
                            }
                          >
                            Moderate
                          </a>
                          <a
                            onClick={() => filterProductOrdersByPriority("Low")}
                          >
                            Low
                          </a>
                          <a
                            onClick={() =>
                              filterProductOrdersByPriority("Planning")
                            }
                          >
                            Planning
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button className="dropbtn">
                      <FaSortAmountDownAlt size={20} color="white" />
                    </button>

                    <div className="dropdown-content">
                      <div className="submenu">
                        <a>Sort by Created</a>
                        <div className="submenu-content">
                          <a onClick={() => sortProductOrdersByCreated("desc")}>
                            (Newest First)
                          </a>
                          <a onClick={() => sortProductOrdersByCreated("asc")}>
                            (Oldest First)
                          </a>
                        </div>
                      </div>
                      <div className="submenu">
                        <a onClick={() => sortProductOrdersByPriority()}>
                          Sort by Priority
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Number
                          </th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            State
                          </th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Task Type
                          </th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Priority
                          </th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Assigned to
                          </th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Short description
                          </th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentRows.length > 0 ? (
                          currentRows.map((order) => (
                            <tr className="tabbody" id="tabbody" key={order.id}>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {order.Number}
                                    </p>{" "}
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {order.state}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {order.TaskType}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {order.Priority}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {order.AssignedTo}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {
                                        order.Created.toISOString().split(
                                          "T",
                                        )[0]
                                      }
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {order.Shortdescription}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      <button
                                        onClick={() =>
                                          handleOrderClick(order.id)
                                        }
                                      >
                                        <FiEye size={20} className="eye-icon" />
                                      </button>
                                      <button onClick={handleClick}>
                                        <FaPencilAlt
                                          size={20}
                                          className="eye-icon"
                                        />
                                      </button>
                                      <button onClick={handleClick}>
                                        <FiTrash2
                                          size={20}
                                          className="trash-icon"
                                        />
                                      </button>
                                      {showConfirmation && (
                                        <div className="popup-container">
                                          <div className="popup">
                                            <h2 className="pop">
                                              <center>
                                                <b>
                                                  Are you sure you want to
                                                  delete this product order?
                                                </b>
                                              </center>
                                            </h2>
                                            <div className="popup-buttons">
                                              <button
                                                onClick={handleConfirmation}
                                                className="confirm"
                                              >
                                                Confirm
                                              </button>
                                              <button
                                                onClick={handleCancel}
                                                className="cancel"
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr className="tabbody">
                            <td colSpan={8} className="no-results">
                              <center>
                                <Image
                                  className="image"
                                  src={NoRecord}
                                  alt="No record"
                                />
                              </center>
                              <center>No records to display</center>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div className="min-w-full leading-normal">
                      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span className="text-xs xs:text-sm text-gray-900">
                          Page {currentPage} of {totalPages}
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                          <button
                            className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                            onClick={previousPage}
                            disabled={currentPage === 1}
                          >
                            Prev
                          </button>
                          <button
                            className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Order Details"
      >
        {dataProductOrders.map((order) => {
          if (order.id === selectedOrderId) {
            return (
              <div className="ml-2 flex mt-2 shadow-lg shadow-gray-500 md:shadow-1/2xl md:shadow-gray-500">
                <div className="Details" key={order.id}>
                  <nav className="navbar">
                    <button
                      onClick={() => setModalIsOpen(false)}
                      className="close-button"
                    >
                      <FaRegWindowClose size={20} />
                    </button>

                    <h3>Product Order</h3>
                    <h3>ID:{order.id}</h3>
                  </nav>
                  <div className="Infos">
                    <p></p>

                    {/* Add any other properties of the order object here */}
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Number:
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          value={order.Number}
                          type="text"
                        ></input>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          State:
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          value={order.state}
                          type="text"
                        ></input>
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Account:
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          value={order.Account}
                          type="text"
                        ></input>
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Task Type:
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          value={order.TaskType}
                          type="text"
                        ></input>
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Order Line Item:
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          value={order.OrderLineItem}
                          type="text"
                        ></input>
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Priority:
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          value={order.Priority}
                          type="text"
                        ></input>
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Assigned To:
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          value={order.AssignedTo}
                          type="text"
                        ></input>
                      </div>
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Created:
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          value={order.Created.toISOString().split("T")[0]}
                          type="text"
                        ></input>
                      </div>
                      <div className="w-full md:w-1/1 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Short description:
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-Gray-500 rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          value={order.Shortdescription}
                          type="text"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </Modal>
    </div>
  );
};

export default function ProductCustomerOrdersPage() {
  return (
    <div className="product-customer-orders">
      <div className="product-customer-orders">
        <Table />
      </div>
    </div>
  );
}
