import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/header/header";
import Section from "./section";
export default function CloudComputingPage() {
    return (
        <div className="cloudcomputing">
            <Header styleElements={{ linksColor: "purple-header-links" }} />
            <Section />
            <Footer />
        </div>
    );
}
