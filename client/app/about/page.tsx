import Footer from "@/components/footer";
import Header from "../../components/header";
import Image from "next/image";
import Link from "next/link";
import dxc from "./dxc-bn-tn.png";
import styles from "../home.module.css";
import SapLogo from "../../public/assets/sap.png";
import ServiceNowLogo from "../../public/assets/ServiceNow_logo.png";
import GoogleCloudLogo from "../../public/assets/Google_Cloud_logo.png";
import RedHatLogo from "../../public/assets/red-hat.jpg";
import SalesForce from "../../public/assets/Salesforce.com_logo.png";
export default function AboutPage() {
    const links = [
        { name: "OUR STORY", href: "https://dxc.com/us/en/about-us/our-story" },
        { name: "AWARDS AND RECOGNITION", href: "https://dxc.com/us/en/about-us/awards-and-recognition" },
        { name: "2022 DXC ANNUAL REPORT", href: "https://dxc.com/us/en/about-us" },
    ];
    const stats = [
        { name: "CLIENTS", subname: "LOCAL & OFFSHOREE", value: "70+" },
        { name: "YEARS", subname: "IT EXPERTISE", value: "15+" },
        { name: "COLLABORATORS", subname: "ON SITE & REMOTE", value: "1200+" },
        {
            name: "CERTIFICATIONS",
            subname: "SUSTAINABLE EXCELLENCE",
            value: "5+",
        },
    ];
   
    const posts = [
        {
            id: 1,
            title: "Mission",
            href: "#",
            image:'/mission.png',
            description:
                "Through innovative solutions, strategic partnerships, and a customer-centric approach, DXC aims to empower organizations with the tools and expertise needed to navigate complex digital landscapes and achieve their goals.",
           
        },
        {
            id: 2,
            title: "Vision",
            href: "#",
            image:'/vision.png',
            description:
                "DXC Technology envisions a future where technology is leveraged to drive positive change and deliver transformative outcomes for businesses and societies worldwide. By harnessing the power of digital innovation.",
           
        },
        {
            id: 3,
            title: "AI Assistant",
            href: "#",
            image:'/assist.png',
            description:
                " Meet Jelena, our friendly AI assistant who is dedicated to enhancing your entire experience with her exceptional capabilities. She goes above and beyond by providing personalized support tailored to your unique needs.",
           
        },
        // More posts...
    ];
    return (
        <div className="about">
            <Header styleElements={{ linksColor: "purple-header-links" }} />

            <div className="relative isolate overflow-hidden bg-gray-900 py-10 sm:py-24">
                <Image
                    src={dxc}
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                />
                <div
                    className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
                <div
                    className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
                <div className="mx-auto  max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            About Us
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            We are an IT services company using the power of
                            technology to build better futures for our
                            customers, colleagues, environment and communities.
                        </p>
                    </div>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                            {links.map((link) => (
                                <a key={link.name} href={link.href}>
                                    {link.name}{" "}
                                    <span aria-hidden="true">&rarr;</span>
                                </a>
                            ))}
                        </div>
                        <div className={styles.centeredText}>
                            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.name}
                                        className="flex flex-col-reverse"
                                    >
                                        
                                        <dt className="text-base leading-7 text-gray-300">
                                            {stat.subname}
                                        </dt>
                                        <dt className="text-base leading-7 text-gray-300">
                                            {stat.name}
                                        </dt>
                                        <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                                            {stat.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"bg-white py-12 sm:py-8 " + styles.centeredText}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="">
                        <h2
                            className="text-5xl font-bold tracking-tight  sm:text-5xl"
                            style={{ color: "#5f249f" }}
                        >
                            WE ACT WITH INTEGRITY
                        </h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Transforming Businesses, Empowering Innovations, and
                            Driving Digital Success <br />
                            <span style={{ color: "#5f249f" }}>- </span>Together
                            with DXC Technology{" "}
                            <span style={{ color: "#5f249f" }}>- </span>
                        </p>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 justify-center  gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="flex max-w-xl flex-col items-start justify-between  box-border h-50 w-50 p-4 border-4 rounded-lg"
                            >
                                <Image
                            src={post.image}
                            alt=""
                            width={125}
                            height={125}
                            className="mx-auto"
                          />
                                <div className="group relative">
                                    <h3 className="mt-4 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <a href={post.href}>
                                            <span className="absolute inset-0" />
                                            {post.title}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-5 text-sm leading-6 text-gray-600">
                                        {post.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-2xl font-semibold leading-8 text-gray-900 py-8">
                        Trusted by the world’s most innovative teams
                    </h2>
                    <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        <Image
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            src={SapLogo}
                            alt="SAP Logo"
                        />
                        <Image
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            src={ServiceNowLogo}
                            alt="ServiceNow"
                        />
                        <Image
                            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            src={GoogleCloudLogo}
                            alt="Google Cloud"
                        />
                        <Image
                            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                            src={RedHatLogo}
                            alt="Red Hat"
                        />
                        <Image
                            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                            src={SalesForce}
                            alt="Salesforce"
                        />
                    </div>
                </div>
            </div>
            <div className="bg-primary-purple h-24 flex items-center">
                <div className="container mx-auto flex justify-between">
                    <h2 className="text-white text-3xl">Connect with DXC</h2>
                    <Link href="/contact">
                        <div className="border-2 border-white text-white py-2 px-5 text-1xl uppercase font-medium">
                            Contact us
                        </div>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
