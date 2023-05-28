// Importing components
import Link from "next/link";
import Image from "next/image";

// Importing assets
import dxc from "@/public/assets/dxc.jpg";

// Importing icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

// Importing styles
import styles from "./footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerLogo}>
                    <Image className="h-26 w-auto" src={dxc} alt="Logo" />
                </div>
                <nav className={styles.footerNav}>
                    <ul className="grid grid-cols-3">
                        <li>
                            <ul>
                                <h3 className="font-semibold purple-header-links">
                                    LINKS
                                </h3>
                                <li>
                                    <Link
                                        href="/Home"
                                        className="text-sm  leading-6 "
                                    >
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/about"
                                        className="text-sm  leading-6"
                                    >
                                        About US
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-sm  leading-6 "
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="font-semibold purple-header-links">
                                SERVICE IT
                            </h3>
                            <ul>
                                <li>
                                    {" "}
                                    <Link
                                        href="/development"
                                        className="text-sm leading-6 "
                                    >
                                        Development
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/cloud-computing"
                                        className="text-sm leading-6 "
                                    >
                                        Cloud Computing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/ssl-certification"
                                        className="text-sm leading-6 "
                                    >
                                        SSl Certification
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/backup-solution"
                                        className="text-sm leading-6 "
                                    >
                                        Back Up Solution
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h3 className="font-semibold purple-header-links">
                                INDUSTRIE IT
                            </h3>
                            <ul>
                                <li>
                                    <Link
                                        href="/integration"
                                        className="text-sm  leading-6 "
                                    >
                                        Integration
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/wifi-survey"
                                        className="text-sm leading-6"
                                    >
                                        Wifi Survey
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/stress-testing-and-modelisation"
                                        className="text-sm  leading-6 "
                                    >
                                        Stresss Testing & modelisation
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <div className={styles.footerSocial}>
                    <ul>
                        <li>
                            <Link href="#">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <FontAwesomeIcon icon={faFacebookSquare} />
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <FontAwesomeIcon icon={faInstagram} />
                            </Link>
                        </li>
                    </ul>
                </div>
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
