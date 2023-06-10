"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateServiceForm from "./../UpdateServiceForm";
import Sidebar from "@/app/(auth)/dashboard/components/Sidebar";
import Header from "@/app/(auth)/dashboard/components/Header";
const page = ({ params }: { params: { id: string } }) => {
  const [service, setService] = useState<any>();
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };
  useEffect(() => {
    getServiceOrder();
  }, []);

  async function getServiceOrder() {
    try {
      const id = params.id;
      const response = await axios.get(
        `http://localhost:5000/api/customer-order/service/${id}`,
      );
      const serviceOrderData = response.data;
      setService(serviceOrderData);
      console.log("Service Data:", serviceOrderData);
    } catch (error) {
      console.error("Error while fetching service order:", error);
    }
  }
  const [editingServiceId, setEditingUserId] = useState(null);
  // const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleEditeService = () => {
    setShowForm(true);
    console.log("show form");
  };
  const handleCancel = () => {};

  // console.log("Services", services);

  return (
    <div>
      <div className="bg-gray-100 flex">
        <Sidebar />
        <div className="bg-white min-h-screen-100 w-5/6">
          <Header />
          {service && (
            <div>
              <div className="h-full bg-white p-8">
                <div className="bg-white rounded-lg shadow-xl pb-8">
                  <div className="flex items-center mt-2">
                    <div className=" mx-2 w-full flex items-center space-x-4 mt-2">
                      {showForm ? (
                         <UpdateServiceForm service={service} onClose={() => setShowForm(false)} />
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditeService()}
                            className="flex items-center bg-purple-600 hover:bg-purple-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                          >
                            <span>Update</span>
                          </button>
                          <button
                            onClick={() => handleCancel()}
                            className="flex items-center bg-purple-600 hover:bg-purple-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
                          >
                            <span>Cancel Order</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                  <div className="w-full flex flex-col 2xl:w-1/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                      <h4 className="text-xl text-gray-900 font-bold">
                        Service Order Informations
                      </h4>
                      <ul className="mt-2 text-gray-700">
                        <li className="flex border-y py-2">
                          <span className="font-bold w-24">External ID:</span>
                          <span className="text-gray-700">
                            {service.externalId}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Order Date:</span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(service.orderDate).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">State:</span>
                          <span className="text-gray-700">{service.state}</span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">Start Date:</span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(
                              service.requestedStartDate,
                            ).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">
                            Resquested Completion Date:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(
                              service.requestedCompletionDate,
                            ).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">
                            Completion Date:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(service.completionDate).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">
                            Completion Date:
                          </span>
                          <span className="text-gray-700">
                            {" "}
                            {new Date(
                              service.expectedCompletionDate,
                            ).toDateString()}
                          </span>
                        </li>
                        <li className="flex border-b py-2">
                          <span className="font-bold w-24">PONR</span>
                          <span className="text-gray-700">{service.ponr}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                      <div className="relative ">
                        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                        {/* <div className="bg-white p-3 hover:shadow">
                          <div className="flex items-center font-semibold text-gray-900 text-xl leading-8">
                            <span className="text-purple-500"></span>
                            <span>i don't know </span>
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
                                    <tr className="hover:bg-grey-lighter">
                                      <td className="py-4 px-6 border-b border-grey-light"></td>
                                      <td className="py-4 px-6 text-center border-b border-grey-light"></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col w-full 2xl:w-2/3">
                    <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                      <div className="relative ">
                        <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>
                        <div className="bg-white p-3 hover:shadow">
                          <div className="flex items-center font-semibold text-gray-900 text-xl leading-8">
                            <span className="text-purple-500"></span>
                            <span>Related List</span>
                          </div>
                          <div className="container mr-5 ml-2 mx-auto bg-white shadow-xl">
                            <div className="w-11/12 mx-auto">
                              <div className="bg-white my-6">
                                <button
                                  onClick={() => handleTabClick(0)}
                                  className={`${
                                    activeTab === 0
                                      ? "bg-purple-600 text-white"
                                      : ""
                                  } px-4 py-2 rounded-l-md transition duration-100`}
                                >
                                  Related Party
                                </button>
                                <button
                                  onClick={() => handleTabClick(1)}
                                  className={`${
                                    activeTab === 1
                                      ? "bg-purple-600 text-white"
                                      : ""
                                  } px-4 py-2 transition duration-100`}
                                >
                                  Service Order Items
                                </button>
                                <button
                                  onClick={() => handleTabClick(2)}
                                  className={`${
                                    activeTab === 2
                                      ? "bg-purple-600 text-white"
                                      : ""
                                  } px-4 py-2 rounded-r-md transition duration-100`}
                                >
                                  Service Characteristics
                                </button>
                              </div>

                              {activeTab === 0 && <Table1 service={service} />}
                              {activeTab === 1 && <Table2 service={service} />}
                              {activeTab === 2 && <Table3 service={service} />}
                            </div>
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
const Table1 = ({ service }: any) => {
  return (
    <>
   
    <table className="text-left w-full border-collapse">
      <thead>
        <tr>
          {/* <th className="py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
          Id
        </th> */}
          <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
            Name
          </th>
          <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
            Reference Type
          </th>
          <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
            Referred Type
          </th>
        </tr>
      </thead>

      <tbody>
        {service.relatedParty.map((relation: any) => {
          const id = relation["@id"];
          const name = relation["name"];
          const referredType = relation["@referredType"];
          const type = relation["@type"];

          return (
            <tr className="hover:bg-grey-lighter "  key={id}>
              <td className="py-4 px-6  border p-2  border-grey-light">{name}</td>
              <td className="py-4 px-6  border p-2  border-grey-light">
                {referredType}
              </td>
              <td className="py-4 px-6  border p-2 border-grey-light">{type}</td>
            </tr>
          );
        })}
      </tbody>
    </table></>
  );
};

const Table2 = ({ service }: any) => {
    const orderRelationships = service.orderRelationship;
    const serviceOrderItems = service.serviceOrderItem;
  return (
    <>
    <table className="text-left w-full border-collapse">
      <thead>
        <tr>
          <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
            ID
          </th>
          <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
            Action
          </th>
          <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
            order Relationship
          </th>

          <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
            Service
          </th>
          <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
            state
          </th>
        </tr>
      </thead>
      <tbody>
        {service.serviceOrderItem.map((relation: any) => {
          const action = relation["action"];
          const id = relation["id"];
          const orderRelationship = relation["orderRelationship"];
          const state = relation["state"];

          return (
            <tr className="hover:bg-grey-lighter">
              <td className="py-4 px-6  border p-2 border-grey-light">{id}</td>
              <td className="py-4 px-6  border p-2  border-grey-light">
                {action}
              </td>
              <td className="py-4 px-6 mx-auto border p-2  border-grey-light">
              <ul>
        {orderRelationship.map((relation:any) => (
          <li key={relation.id}>{relation.relationshipType}</li>
        ))}
      </ul>
              </td>

              <td className="py-4 px-6  border p-2 border-grey-light">  <ul>
        {serviceOrderItems.map((item:any) => (
          <li key={item.id}>{item.service["@type"]}</li>
        ))}
      </ul></td>
              <td className="py-4 px-6 border p-2  border-grey-light">{state}</td>
            </tr>
          );
        })}
      </tbody>
    </table></>
  );
};
const Table3 = ({ service }: any) => {
    const serviceOrderItems = service.serviceOrderItem;
  return (<>
    
    <table className="text-left w-full border-collapse">
      <thead>
        <tr>
          <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2 border-grey-light">
           Name
          </th>
          <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border p-2  border-grey-light">
           Value
          </th>
         
        </tr>
      </thead>
      <tbody>
      {serviceOrderItems.map((item:any) => (
            <>
              <tr key={item.id}>
                
              </tr>
              {item.service.serviceCharacteristic.map((characteristic:any) => (
                <tr key={characteristic.name}>
                  <td className="py-4 px-6  border p-2  border-grey-light">{characteristic.name}</td>
                  <td className="py-4 px-6 border p-2  border-grey-light mx-auto">{characteristic.value}</td>
                </tr>
              ))}
            </>
          ))}
    
          
      </tbody>
    </table></>
  );
};

export default page;
