import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/header/header";
import Section from "./section";
import Content from "./content";
export default function SslCertificationPage() {
    return (
        <div className="sslcertification">
            <Header styleElements={{ linksColor: "purple-header-links" }} />
            <Section />
            <Content />
            <Footer />
        </div>
    );
}
