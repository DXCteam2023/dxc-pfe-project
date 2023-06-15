import React from "react";
import dataCostumerOrders from "../data/dataCostumerOrders";
import dataProductOfferings from "../data/dataProductOfferings";

const StatisticCards = () => {
  /*  Total Completed Costumer Orders */
  const CompletedOrders = dataCostumerOrders.filter(
    (order) => order.state === "completed",
  );
  const totalCompletedOrders = CompletedOrders.length;

  /*  Statistics %  CompletedCostumer Orders */
  const percenCompletedOrders = Math.floor(
    (totalCompletedOrders / dataCostumerOrders.length) * 100,
  );

  /*  Total In draft Costumer Orders */
  const DraftProductOfferings = dataProductOfferings.filter(
    (product) => product.state === "draft",
  );
  const totalDraftProductOfferings = DraftProductOfferings.length;

  /*  Statistics %  Canceled Costumer Orders */
  const percentDraftProductOfferings = Math.floor(
    (totalDraftProductOfferings / dataProductOfferings.length) * 100,
  );

  /*  Total In progress Costumer Orders */
  const InprogressOrders = dataCostumerOrders.filter(
    (order) => order.state === "in progress",
  );
  const totalInProgressOrders = InprogressOrders.length;

  /*  Statistics %  Canceled Costumer Orders */
  const percenInprogressOrders = Math.floor(
    (totalInProgressOrders / dataCostumerOrders.length) * 100,
  );

  /*  Total Archived Product Offering  */
  const ArchidedProductOfferings = dataProductOfferings.filter(
    (product) => product.state === "archived",
  );
  const totalArchivedProductOfferings = ArchidedProductOfferings.length;

  /*  Statistics %  Archived Product Offering  */
  const percentArchivedProductOfferings = Math.floor(
    (totalArchivedProductOfferings / dataProductOfferings.length) * 100,
  );

  /*  Total Published Product Offering  */
  const PublichedProductOfferings = dataProductOfferings.filter(
    (product) => product.state === "published",
  );
  const totalPublichedProductOfferings = PublichedProductOfferings.length;

  /*  Statistics %  Published Product Offering  */
  const percentPublichedProductOfferings = Math.floor(
    (totalPublichedProductOfferings / dataProductOfferings.length) * 100,
  );

  /*  Total In progress Costumer Orders */
  const CanceledOrders = dataCostumerOrders.filter(
    (order) => order.state === "canceled",
  );
  const totalInCanceledOrders = CanceledOrders.length;

  /*  Statistics %  in Progress Costumer Orders */
  const percenCanceledOrders = Math.floor(
    (totalInCanceledOrders / dataCostumerOrders.length) * 100,
  );

  return (
    <>
      <h1 className=" ml-8 mt-2 mb-2 text-xl font-semibold tracking-tight text-gray-600  ">
        Statistic Cards
      </h1>
      <section className="text-gray-600 body-font bg-white flex justify-center items-center">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>
                  <h2 className="text-gray-900 text-lg font-bold">
                    Total Completed Orders
                  </h2>
                  <h3 className="mt-3 text-3xl font-bold leading-8">
                    {" "}
                    Total: {totalCompletedOrders}{" "}
                  </h3>
                  <button className="text-sm mt-6 px-4 py-2 bg-green-400  text-white rounded-lg  tracking-wider hover:bg-green-500 outline-none">
                    View in Table
                  </button>
                </div>
                <div className="bg-gradient-to-tr from-green-500 to-green-500 w-24 h-24  rounded-full shadow-xl shadow-green-300 border-white   border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white mt-1 text-base">
                      Complete
                      <br />
                      {percenCompletedOrders}%
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>
                  <h2 className="text-gray-900 text-lg font-bold">
                    Total In Progress Orders
                  </h2>
                  <h3 className="mt-3 text-3xl font-bold leading-8">
                    {" "}
                    Total :{totalInProgressOrders}
                  </h3>
                  <button className="text-sm mt-6 px-4 py-2 bg-yellow-500 text-white rounded-lg  tracking-wider hover:bg-yellow-300 outline-none">
                    View in Table
                  </button>
                </div>
                <div className="bg-gradient-to-tr from-yellow-600 to-yellow-300 w-24 h-24 rounded-full shadow-xl shadow-yellow-200  border-white   border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white mt-1 text-base">
                      In <br />
                      Progress
                      <br />
                      {percenInprogressOrders}%
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>
                  <h2 className="text-gray-900 text-lg font-bold">
                    Total Canceled Orders
                  </h2>
                  <h3 className="mt-3 text-3xl font-bold leading-8">
                    Total: {totalInCanceledOrders}{" "}
                  </h3>
                  {
                    <button className="text-sm mt-6 px-4 py-2 bg-orange-400  text-white rounded-lg  tracking-wider hover:bg-orange-500 outline-none">
                      View in Table
                    </button>
                  }
                </div>
                <div className="bg-gradient-to-tr from-orange-500 to-orange-400 w-24 h-24  rounded-full shadow-xl shadow-orange-200  border-white  border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white mt-1 text-base">
                      Cancel
                      <br />
                      {percenCanceledOrders}%
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>
                  <h2 className="text-gray-900 text-lg font-bold">
                    Total Published Product Offerings
                  </h2>
                  <h3 className="mt-3 text-3xl font-bold leading-8t">
                    Total:{totalPublichedProductOfferings}
                  </h3>
                  <button className="text-sm mt-6 px-4 py-2 bg-cyan-400  text-white rounded-lg  tracking-wider hover:bg-cyan-500 outline-none">
                    View in Table
                  </button>
                </div>
                <div className="bg-gradient-to-tr from-cyan-500 to-cyan-400 w-24 h-24  rounded-full shadow-2xl shadow-cyan-200  border-white border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white mt-1 text-base">
                      Publish
                      <br />
                      {percentPublichedProductOfferings}%
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>
                  <h2 className="text-gray-900 text-lg font-bold">
                    Total Retired Product Offerings
                  </h2>
                  <h3 className="mt-2 text-xl font-bold text-cyan-500 text-left">
                    4 -3%
                  </h3>
                  <p className="text-sm font-semibold text-gray-400">
                    Last Transaction
                  </p>
                  <button className="text-sm mt-6 px-4 py-2 bg-cyan-400  text-white rounded-lg  tracking-wider hover:bg-cyan-500 outline-none">
                    View in Table
                  </button>
                </div>
                <div className="bg-gradient-to-tr from-cyan-500 to-cyan-400 w-24 h-24  rounded-full shadow-2xl shadow-cyan-300  border-white  border-dashed border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white text-xl">Retired</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div>
                  <h2 className="text-gray-900 text-lg font-bold">
                    Total In Draft Product Offerings
                  </h2>
                  <h3 className="mt-2 text-xl font-bold text-indigo-500 text-left">
                    5 +5%
                  </h3>
                  <p className="text-sm font-semibold text-gray-400">
                    Last Transaction
                  </p>
                  <button className="text-sm mt-6 px-4 py-2 bg-indigo-400 text-white rounded-lg  tracking-wider hover:bg-indigo-500 outline-none">
                    View in Table
                  </button>
                </div>
                <div className="bg-gradient-to-tr from-indigo-500 to-indigo-400 w-24 h-24  rounded-full shadow-2xl shadow-[#304FFE] border-white  border-dashed border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white text-xl">Draft</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StatisticCards;
