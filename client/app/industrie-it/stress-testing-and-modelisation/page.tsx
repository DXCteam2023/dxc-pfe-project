import Footer from "@/components/footer";
import Header from "@/components/header";
import Section from "./section";
import Content from "../wifi-survey/content"
export default function StressTestingAndModelisationPage() {
    return <div className="stresstestingandmodelisation">
        <Header styleElements={{ linksColor: "purple-header-links" }} />
        <Section/>
          <Content/>
            <Footer/>
    </div>
}