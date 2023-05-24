import Footer from "@/components/footer";
import Header from "../../components/header";
import Image from "next/image";
import dxc from "../../components/dxc.jpg";
import styles from "../../app/home.module.css";
export default function loginPage() {
    return <div className="login ">
        <Header styleElements={{ linksColor: "purple-header-links" }} />
        <div className="shadow-md  px-8 py-12 lg:px-8  flex-1 flex-col">
        <div className=" shadow-md flex  min-h-full flex-1 flex-col justify-center px-8 py-12 lg:px-8">
        <div className="  shadow-md sm:mx-auto sm:w-full sm:max-w-sm ">
            <div className=" flex justify-center"><Image className="h-20 w-auto" src={dxc} alt="logo" /></div>
        
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight purple-header-links">
            Sign in to your account
          </h2>
        </div>

        <div className="  mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="  space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">
                Email ID
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={styles.button}
              >
               Log In
              </button>
              
            </div>
            <div className="text-sm">
                  <a href="#" className="font-semibold text-gray-400 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
          </form>
        </div>
      </div>
        </div>
       
            <Footer/>
    </div>
}