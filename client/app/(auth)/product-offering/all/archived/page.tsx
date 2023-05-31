import Header from "@/app/components/header/header";
import {product_Archived} from "./data"
import Footer from "@/app/components/footer/footer";
export default function ArchivedProductOfferingsPage() {
    return (
        <div className="archived-product-offerings">
         <Header styleElements={{ linksColor: "purple-header-links" }} />
        



            <h1 className="text-center text-blue-700 text-4xl font-bold text-gray-900 dark:text-white" >Archived Product Offerings Page</h1>

            
<div className="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ padding:60}}>
    <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800">
       
        <label  className="sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
        </div>
    </div>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    
                Number
                </th>
                <th scope="col" className="px-6 py-3">
                    
                   Display name
                </th>
                <th scope="col" className="px-6 py-3">
                Status
                </th>
                <th scope="col" className="px-6 py-3">
                Product specification
                </th>
                <th scope="col" className="px-6 py-3">
                Monthly recurring charges

                </th>
                <th scope="col" className="px-6 py-3">
                Version
                </th>
                <th scope="col" className="px-6 py-3">
                Start date
                </th>
            </tr>
        </thead>
        <tbody>
        {product_Archived.map(( item, index ) => {
          return (
           
           <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                   
                    {item.number}
                </th>
                <td className="px-6 py-4">
                {item.display_name}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> {item.status}
                    </div>
                </td>
                <td className="px-6 py-4">
                {item.product_specification}
                </td>
                <td className="px-6 py-4">
                {item.mrc}$
                </td>
                <td className="px-6 py-4">
                {item.version}
                </td>
                <td className="px-6 py-4">
                {item.start_date}
                </td>
            </tr> 
                );
            })}
        </tbody>
    </table>
    
</div>
<Footer />
</div>

    );
}
