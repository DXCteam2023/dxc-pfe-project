import Footer from "@/components/footer";
import Header from "@/components/header";
import Team from "./team";
import Content from "./content-section";
export default function DevelopmentPage() {
    return <div className="development">
        <Header styleElements={{ linksColor: "purple-header-links" }} />
          <Team/>
          <Content/>
            <Footer/>

    </div>
}