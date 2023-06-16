"use client";
import React, { useEffect, useState } from "react";
import dataProductOrders from "../data/dataProductOrders";
import { FiEye, FiFilter, FiRefreshCcw, FiSearch, FiTrash2 } from "react-icons/fi";
import Modal from "react-modal";
import Link from "next/link.js";
import {
 
  FaBackward,
  FaCog,
  FaPencilAlt,
  FaRegWindowClose,
  FaSortAmountDownAlt,
 
  FaTrashAlt,
} from "react-icons/fa";
import NoRecord from "@/public/assets/NoRecord.png";
import Image from "next/image";
import axios from "axios";
import { ACTION_FAST_REFRESH } from "next/dist/client/components/router-reducer/router-reducer-types";



const Table = () => {
  const [selectedState, setSelectedState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");


  const [productOrders, setProductOrders] = React.useState<
  Array<{
    
    _id: number;
    id: string;
    externalId: string;
    ponr: boolean;
    href: string;
    completionDate: string;
    expectedCompletionDate: string;
    orderDate: string;
    requestedCompletionDate: string;
    requestedStartDate: string;
    state: string;
    version: string;
    "@type": string;
  }>
>([]);
  // Ajouter sortOrder comme variable d'état
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedPONR, setSelectedPONR] = useState("");
  const [showTaskType, setShowTaskType] = useState(false);

  // Fonction pour gérer le tri
  const handleSort = (order: React.SetStateAction<string>) => {
    setSortOrder(order);
  };
  
const FiltredData = productOrders
.filter((order) => selectedState === "" || order.state === selectedState)
  const handleStateFilter = (state: React.SetStateAction<string>) => {
    
    setSelectedState(state);
    setSelectedPONR("");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/customer-order/product",
        );
        setProductOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (productOrders.length === 0) {
    return <p>No product orders found.</p>;
  }
// Trier les commandes de produits en fonction de sortOrder
const sortedProductOrders = productOrders.sort((a, b) => {
  const dateA = new Date(a.completionDate);
  const dateB = new Date(b.completionDate);

  if (sortOrder === "newest") {
    return dateB.getTime() - dateA.getTime();
  } else if (sortOrder === "oldest") {
    return dateA.getTime() - dateB.getTime();
  }

  // Retourne 0 si aucun ordre de tri correspondant n'est trouvé
  return 0;
});
const handlePONRFilter = (value: React.SetStateAction<string>) => {
  setSelectedPONR(value);
};
const handleAllFilter = () => {
  setSelectedState("");
  setSelectedPONR("");
};
const filteredData = FiltredData.filter((order) =>
  order.id.toLowerCase().includes(searchQuery.toLowerCase())
  &&
    (selectedPONR === "" || order.ponr === (selectedPONR === "true"))
);
const handleToggleTaskType = () => {
  setShowTaskType(!showTaskType);
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                    <FiSearch size={15} className="search-icon" />
                  </div>
                  <button className="btn" onClick={handleAllFilter}>
  ALL
</button>
                  <Link href="/customer-order/all/product/Form">
                    <button className="btn">NEW</button>
                  </Link>
                  <div className="dropdown">
                    <button className="dropbtn" onClick={handleAllFilter} title="Refresh" >
                      <FiRefreshCcw size={20} color="white" />
                    </button>
                   
                  
                
                    </div>
                  <div className="dropdown">
                    <button className="dropbtn">
                      <FaCog size={20} color="white" />
                    </button>
                    <div className="dropdown-content">
                      <div className="submenu">
                      <a href="#">
                        SHOW/HIDE
     
</a>
                        <div className="submenu-content">
             
                        
  
  <a
              className="px-3 py-1.5 rounded-md bg-white border border-gray-300"
              onClick={handleToggleTaskType}
            >
              {showTaskType ? (
                
                 
                  <p className="text-black-500">Hide Task Type</p>
                
              ) : (
               
                  
                  <p className="text-black-500">Show Task Type</p>
                
              )}
           
</a>
                        </div>
                      </div>
                
                    </div>
                  </div>
                  <div className="dropdown">
                    <button className="dropbtn">
                      <FiFilter size={20} color="white" />
                    </button>
                    <div className="dropdown-content">
                      <div className="submenu">
                        <a href="#">State</a>
                        <div className="submenu-content">
                        <a onClick={() => handleStateFilter("completed")}><p className="text-black-500">Completed</p></a>
                  <a onClick={() => handleStateFilter("canceled")}><p className="text-black-500">Canceled</p></a>
                  <a onClick={() => handleStateFilter("on hold")}><p className="text-black-500">On Hold</p></a>
                  <a onClick={() => handleStateFilter("in progress")}><p className="text-black-500">In Progress</p></a>
                  <a onClick={() => handleStateFilter("scheduled")}><p className="text-black-500">Scheduled</p></a>
                </div>
                      </div>
                      <div className="submenu">
                        <a href="#">PONR</a>
                        <div className="submenu-content">
                        <a onClick={() => handlePONRFilter("true")}><p className="text-black-500">True</p></a>
                        <a onClick={() => handlePONRFilter("false")}><p className="text-black-500">False</p></a>
                           
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
                        <a>Sort by Order date</a>
                        <div className="submenu-content">
                        <a onClick={() => handleSort("newest")}><p className="text-black-500">Newest first</p></a>
                        <a onClick={() => handleSort("oldest")}><p className="text-black-500">Oldest first</p></a>

                        </div>
                      </div>
                      <div className="submenu">
                      </div>
                    </div>
                  </div>
                  <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Completion Date
                          </th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                          Requested start Date
                          </th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            state
                          </th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                           ORDER DATE
                          </th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            PONR
                          </th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
  {showTaskType ? 'TASK TYPE' : ''}
</th>
                          <th className="px-5 py-3 border-b-2 border-200 bg-700 text-white text-left text-xs font-semibold uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
  {filteredData.length === 0 ? (
    <tr className="tabbody">
    <td colSpan={8} className="no-results">
      <center>
        <Image className="image" src={NoRecord} alt="No record" />
      </center>
      <center>No records to display</center>
    </td>
  </tr>
  ) : (
    
    filteredData.map((order) => (
     <tr key={order._id}>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {order.id}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                                <p className="text-gray-900 whitespace-no-wrap">
    {new Date(order.completionDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })}{" "}
    {new Date(order.completionDate).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}
  </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
    {new Date(order.requestedStartDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })}{" "}
    {new Date(order.requestedStartDate).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}
  </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
  <span
    aria-hidden
    className={`absolute inset-0 ${
      order.state === 'completed'
        ? 'bg-green-200'
        : order.state === 'on hold'
        ? 'bg-yellow-200'
        : order.state === 'in progress'
        ? 'bg-blue-200'
        : order.state === 'canceled'
        ? 'bg-red-200'
        : order.state === 'scheduled'
        ? 'bg-purple-200'
        : ''
    } rounded-full`}
  ></span>
  <span className="relative">{order.state}</span>
</span>

                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="ml-3">
 
                                    <p className="text-gray-900 whitespace-no-wrap">
    {new Date(order.orderDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })}{" "}
    {new Date(order.orderDate).toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })}
  </p>
                                  </div>
                                </div>
                              </td>
                              
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <span className={`relative inline-block px-3 py-1 font-semibold rounded-full text-black-900 leading-tight ${order.ponr ? 'bg-green-200' : 'bg-red-200'}`}>
                              
                              <span className="relative ">{order.ponr ? 'True' : 'False'}</span>
                              </span>

                              
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                              {showTaskType ? 'Product Order' : ''}
                                </p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                              <Link href={`/customer-order/product/${order._id}`}
                                        
                                      >
                                        <FiEye size={18} className="icon" />
                                      </Link>
                              <Link href={`/customer-order/product/edit?orderId=${order._id}`} >
                                        <FaPencilAlt
                                          size={18}
                                          className="icon"
                                        />
                                      </Link>
                                      <Link href={`/customer-order/product/edit?orderId=${order.id}`} >
                                        <FaTrashAlt
                                          size={18}
                                          className="icon"
                                        />
                                      </Link>
                                </p>
                              </td>
                            </tr>

      ))
  )}
</tbody>

                    </table>
                    <div className="min-w-full leading-normal">
                      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span className="text-xs xs:text-sm text-gray-900">
                         
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                          
                          <button
                            className={`text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l `}
                           
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
