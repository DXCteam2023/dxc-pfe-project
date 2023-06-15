// import { product_Archived } from "./data";

import Sidebar from "@/app/(auth)/dashboard/components/Sidebar";
import Footer from "@/app/(auth)/dashboard/components/Footer";
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
