import Header from "../components/header";

import {Poppins} from 'next/font/google';
import styles from "./home.module.css";
const poppins= Poppins({
  weight: '600',
  subsets: ['latin'],
});
export default function Home() {
  
    return (
        <div className={styles.home}>
            <Header />

            <div className={styles.container+" "+poppins.className+" container mx-auto "}>
                <h1 className={styles.h1}>Welcome to</h1>
                <h2 className={styles.h2}>POWERTHECH EMPIRE,</h2>
                <p>
                    Where technology meets innovation. We are a leading IT
                    company <br />
                    dedicated to providing cutting-edge solutions and services{" "}
                    <br />
                    to empower businesses and individuals in the digital age.
                </p>
                <button className={styles.button}>
                  Learn more
                </button>
            </div>
        </div>
    );
}
