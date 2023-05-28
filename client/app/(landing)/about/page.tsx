// Importing components
import Footer from "@/app/components/footer/footer";
import Header from "@/app/components/header/header";

export default function AboutPage() {
    return (
        <div className="about">
            <Header styleElements={{ linksColor: "purple-header-links" }} />
            <Footer />
        </div>
    );
}
