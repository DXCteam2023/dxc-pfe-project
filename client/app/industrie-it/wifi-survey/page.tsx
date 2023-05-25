import Footer from "@/components/footer";
import Header from "@/components/header";
import Section from "./section";
import Content from "./content"
export default function WifiSurveyPage() {
    return <div className="wifisurvey">
        <Header styleElements={{ linksColor: "purple-header-links" }} />
        <Section/>
          <Content/>
            <Footer/>
    </div>
}