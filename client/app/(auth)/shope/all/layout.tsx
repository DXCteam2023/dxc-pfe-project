// import Header from "../components/Header";
import Providers from "../components/Providers";
import '../styles/globals.css';
import Sidebar from "../../../../app/(auth)/dashboard/components/Sidebar";
import Footer from "../../../../app/(auth)/dashboard/components/Footer";
import Header from "../../../../app/(auth)/dashboard/components/header/Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div>
      <div className="flex">
      <Sidebar />
      
      <div >
        <Providers>
        <Header />
          {children}
        </Providers>
        </div>
        </div>
        <Footer />
        </div>
  );
}
