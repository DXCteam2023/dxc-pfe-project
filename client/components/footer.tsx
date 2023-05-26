import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";
import dxc from "./dxc.jpg";
import { FaLinkedinIn } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <nav className={styles.footerNav}>
                    <div className="grid grid-cols-1 gap-1 md:flex lg:gap-[7.75rem]">
                        <div className={styles.footerLogo}>
                            <Image
                                className="h-26 w-auto"
                                src={dxc}
                                alt="Logo"
                            />
                        </div>
                        <div className="mt-5">
                            <h3 className="font-semibold purple-header-links">
                                LINKS
                            </h3>
                            <p>
                                <Link
                                    href="/Home"
                                    className="text-sm  leading-6 "
                                >
                                    Home
                                </Link>
                            </p>
                            <p>
                                <Link
                                    href="/about"
                                    className="text-sm  leading-6"
                                >
                                    About US
                                </Link>
                            </p>

                            <p>
                                <Link
                                    href="/contact"
                                    className="text-sm  leading-6 "
                                >
                                    Contact Us
                                </Link>
                            </p>
                        </div>
                        <div className="mt-5">
                            <h3 className="font-semibold purple-header-links">
                                SERVICE IT
                            </h3>{" "}
                            <p>
                                <Link
                                    href="/development"
                                    className="text-sm leading-6 "
                                >
                                    Development
                                </Link>
                            </p>
                            <p>
                                <Link
                                    href="/cloud-computing"
                                    className="text-sm leading-6 "
                                >
                                    Cloud Computing
                                </Link>
                            </p>
                            <p>
                                <Link
                                    href="/ssl-certification"
                                    className="text-sm leading-6 "
                                >
                                    SSl Certification
                                </Link>
                            </p>
                            <p>
                                <Link
                                    href="/backup-solution"
                                    className="text-sm leading-6 "
                                >
                                    Back Up Solution
                                </Link>
                            </p>
                        </div>

                        <div className="mt-5">
                            <h3 className="font-semibold purple-header-links">
                                INDUSTRIE IT
                            </h3>
                            <p>
                                <Link
                                    href="/integration"
                                    className="text-sm  leading-6 "
                                >
                                    Integration
                                </Link>
                            </p>

                            <p>
                                <Link
                                    href="/wifi-survey"
                                    className="text-sm leading-6"
                                >
                                    Wifi Survey
                                </Link>
                            </p>

                            <p>
                                <Link
                                    href="/stress-testing-and-modelisation"
                                    className="text-sm  leading-6 "
                                >
                                    Stresss Testing & modelisation
                                </Link>
                            </p>
                        </div>
                        <div className={styles.footerSocial}>
                            <h3 className="font-semibold purple-header-links">
                                JOIN US
                            </h3>
                            <h5 className="text-sm  leading-6 text-gray-500">
                                Join our dynamic community
                                <br /> of IT professionals
                                <br />
                                and like-minded enthusiasts!
                            </h5>
                            <ul style={{ display: "flex", listStyle: "none" }}>
                                <li className="mx-5 h-5 w-5">
                                    <Link href="#">
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </Link>
                                </li>
                                <li className="mx-5 h-5 w-5">
                                    <Link href="#">
                                        <FontAwesomeIcon
                                            icon={faFacebookSquare}
                                        />
                                    </Link>
                                </li>
                                <li className="mx-5 h-5 w-5">
                                    <Link href="#">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <p className={styles.footerCopy}>
                COPYRIGHT © 2023 DXC TECHNOLOGY MAROC . ALL RIGHTS RESERVED.
                <br />
                We act with integrity.
            </p>
        </footer>
    );
};

export default Footer;
