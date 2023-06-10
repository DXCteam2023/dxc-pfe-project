import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TopCards from "./components/TopCards";
import BarChart from "./components/RecentCustomerOrders";
import Card from "./components/Card";
import StatisticCards from "./components/StatisticCards";
import Footer from "./components/Footer";
import TableProductOfferings from "./components/TableProductOfferings";
import Stats from "./components/Stats";

export default function DashboardHome() {
  return (
    <div className="bg-gray-100 flex">
      
      <Sidebar /> 
      <div className="bg-white  min-h-screen-100 w-5/6  ">
        <Header />
        
        <div className="flex p-2 ">
                        {/* <div className="flex py-3 px-2 items-center">
                            <p className="text-2xl text-purple-500 font-semibold">DXC</p> <p className="ml-2 font-semibold italic">
                            DASHBOARD</p>
                        </div>*/}
                    </div> 
        <TopCards />
        {/* <Stats/> */}
        <StatisticCards />
        <TableProductOfferings/>
        <BarChart />
        <Footer />
      </div>
      {/* Autres composants ou contenu de la page */}
    </div>
  );
}
