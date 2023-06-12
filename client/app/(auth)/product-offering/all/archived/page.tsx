import Header from "@/app/components/header/header";
import { product_Archived } from "./data";
import Footer from "@/app/components/footer/footer";
import ArchivedProductOfferings from "./components/ArchivedProductOfferings";
import Sidebar from "@/app/(auth)/dashboard/components/Sidebar";
export default function ArchivedProductOfferingsPage() {
  return (
    <div >
      {/* <Header styleElements={{ linksColor: "purple-header-links" }} /> */}

      <h1 className="text-center text-blue-700 text-4xl font-bold text-gray-900">
        Archived Product Offerings Page
      </h1>
     
     <div className="flex ">
     <Sidebar/>
     
      <ArchivedProductOfferings />
      </div>

     
     


      <Footer />
    </div>
  );
}
