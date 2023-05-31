import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TopCards from "./components/TopCards";
import BarChart from "./components/BarChart";
import Card from "./components/Card";
import StatisticCards from "./components/StatisticCards";
import Footer from "./components/Footer";

export default function DashboardHome() {
  return (
    <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white  min-h-screen-100 w-5/6">
        <Header />
        <TopCards />
        <StatisticCards />
        <Card />
        <BarChart />
        <Footer />
      </div>
      {/* Autres composants ou contenu de la page */}
    </div>
  );
}
