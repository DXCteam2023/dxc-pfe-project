// import { product_Archived } from "./data";

import ArchivedProductOfferings from "./components/ArchivedProductOfferings";
import Sidebar from "@/app/(auth)/dashboard/components/Sidebar";
import Footer from "@/app/(auth)/dashboard/components/Footer";

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
