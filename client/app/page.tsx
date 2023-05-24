import Header from "../components/header";
import Footer from "../components/footer";

import { Poppins } from "next/font/google";
import styles from "./home.module.css";
const poppins = Poppins({
    weight: "600",
    subsets: ["latin"],
});
export default function Home() {
    return (
        <div className={styles.home}>
            <Header styleElements={{ linksColor: "white-header-links" }} />

            <div
                className={
                    styles.container +
                    " " +
                    poppins.className +
                    " container mx-auto "
                }
            >
                <h1 className={styles.h1}>Welcome to</h1>
                <h2 className={styles.h2}>DXC TECHNOLOGY MAROC,</h2>
                <p>
                    Where technology meets innovation. We are a leading IT
                    company <br />
                    dedicated to providing cutting-edge solutions and services{" "}
                    <br />
                    to empower businesses and individuals in the digital age.
                </p>
                <button className={styles.button}>Learn more</button>
            </div>
            <Footer />
        </div>
    );
}
