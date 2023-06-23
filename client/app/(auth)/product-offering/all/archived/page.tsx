// import { product_Archived } from "./data";

import Sidebar from "../../../dashboard/components/Sidebar";
import Footer from "../../../dashboard/components/Footer";
import ArchivedProductOfferings from "./components/ArchivedProductOfferings";

export default function ArchivedProductOfferingsPage() {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <ArchivedProductOfferings />
      </div>
      <Footer />
    </div>
  );
}
