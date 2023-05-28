"use client";

// Importing modules
import { SyntheticEvent } from "react";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

// Importing assets
import dxc from "@/public/assets/dxc.jpg";

// Importing components
import Image from "next/image";
import Footer from "@/app/components/footer/footer";
import Header from "../../components/header/header";

// Importing styles
import styles from "../../home.module.css";

export default function loginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const url = "http://localhost:8000/api/login";
            const { data: res } = await axios.post(url, { email, password });
            localStorage.setItem("token", res.data);
            localStorage.setItem("user", JSON.stringify(res.user));
            alert(res.message);
            window.location.href = "/";
            // <Redirect to="/login"/>
            //console.log(res.message);
        } catch (err: any) {
            if (
                err.response ||
                err.response.status >= 400 ||
                err.response <= 500
            ) {
                setError(err.response.data.message);
                console.log(err.response.data.message);
            }
        }
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are going to Logout!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#5f249f",
            confirmButtonText: "Logout",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.reload();
            }
        });
    };

    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        let tokenUser;
        let user;
        // Get the value from local storage if it exists
        tokenUser = localStorage.getItem("token") || "";
        setToken(tokenUser);

        user = localStorage.getItem("user") || "";
        setUsername(user);
    }, []);

    return (
        <div className="login ">
            <Header styleElements={{ linksColor: "purple-header-links" }} />
            {token && username ? (
                <div className="shadow-md  px-8 py-12 lg:px-8  flex-1 flex-col">
                    <div className=" shadow-md flex  min-h-full flex-1 flex-col justify-center px-8 py-12 lg:px-8">
                        <div className="  shadow-md sm:mx-auto sm:w-full sm:max-w-sm ">
                            <div className=" flex justify-center">
                                <Image
                                    className="h-20 w-auto"
                                    src={dxc}
                                    alt="logo"
                                />
                            </div>
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight purple-header-links">
                                You're already logged in
                            </h2>

                            <div className="flex justify-center">
                                <button
                                    onClick={handleLogout}
                                    type="submit"
                                    className={styles.button}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="shadow-md  px-8 py-12 lg:px-8  flex-1 flex-col">
                    <div className=" shadow-md flex  min-h-full flex-1 flex-col justify-center px-8 py-12 lg:px-8">
                        <div className="  shadow-md sm:mx-auto sm:w-full sm:max-w-sm ">
                            <div className=" flex justify-center">
                                <Image
                                    className="h-20 w-auto"
                                    src={dxc}
                                    alt="logo"
                                />
                            </div>
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight purple-header-links">
                                Sign in to your account
                            </h2>
                        </div>

                        <form
                            className="space-y-6 mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
                            onSubmit={handleSubmit}
                            method="POST"
                        >
                            {error ? (
                                <div className="text-red-500 flex justify-center">
                                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                                    {error}
                                </div>
                            ) : (
                                ""
                            )}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-500"
                                >
                                    Email ID
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-500"
                                    >
                                        Password
                                    </label>
                                    <a
                                        href="#"
                                        className="text-sm font-semibold text-gray-400 hover:text-indigo-500 me-1"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-2"
                                />
                            </div>

                            <div className="flex justify-center">
                                <button type="submit" className={styles.button}>
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}
