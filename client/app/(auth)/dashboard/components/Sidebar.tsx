"use client";
import { useState } from "react";
import React, { ReactNode } from "react";
import Link from "next/link";
import { RxSketchLogo, RxDashboard, RxPerson, RxHome } from "react-icons/rx";
import { RiNotification2Line } from "react-icons/ri";
import { HiOutlineShoppingBag, HiLogout } from "react-icons/hi";
import { FiSettings, FiUsers, FiArchive } from "react-icons/fi";
import photo from "@/public/assets/dev3.jpg";
import Image from "next/image";
import { SideBarData } from "../data/SidebarData";

interface SidebarProps {
    children: ReactNode;
}

const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const renderIcon = (id: string) => {
        // Retourne l'icône correspondante en fonction de l'ID
        switch (id) {
            case "0":
                return <RxDashboard size={20} color="gray" />;
            case "1":
                return <FiArchive size={20} color="gray" />;
            // Ajoutez des cas supplémentaires pour d'autres icônes
            default:
                return null;
        }
    };

    const user_profile = "admin";
    const data = SideBarData.filter((item: any) =>
        item.profile.includes(user_profile),
    );

    return (
        <div className="w-1/6  shadow-lg bg-white lg:flex  tracking-tight flex-col">
            <div className="flex flex-col bg-white-100 items-center justify-center  mt-2">
                <div className="flex flex-col items-center mt-2">
                    <Image
                        className="w-14 h-14 mb-3 rounded-full  lg:flex  tracking-tight shadow-lg"
                        src={photo}
                        alt="Bonnie image"
                    />
                    <h5 className=" pt-2 text-lg font-semibold mb-1 font-small text-gray-900 ">
                        Bonnie Green
                    </h5>
                    <span className="text-sm text-gray-600">
                        Product Offering Manager
                    </span>
                    
                </div>
                <span className="border-b-[1px] border-purple-200 w-2/3 p-3 w-16 md:w-32 lg:w-48"></span>
            </div>
            <div className="flex mt-3 flex-col space-y-0.5 ">
                {data.map((item) => (
                    <Link href={item.path} key={item.id}>
                        <div className="cursor-pointer p-3  inline-flex items-center">
                            <div className=" border rounded-md bg-white w-[30px] h-[30px] flex items-center justify-center md:flex  tracking-tight ">{item.icon}</div>
                            {" "}
                            {/* Appel à une fonction renderIcon pour afficher l'icône correspondante */}
                            <p className="flex-1 ml-3 font-semibold text-left whitespace-nowrap text-gray-900 lg:flex  tracking-tight ">
                                {item.name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <span className="border-b-[1px] border-purple-200 w-full p-10"></span>
        </div>
    );
};

export default Sidebar;
