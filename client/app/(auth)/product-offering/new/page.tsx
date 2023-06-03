
 import Header from "../../dashboard/components/Header";

import Sidebar from "../../dashboard/components/Sidebar";

export default function NewProductOfferingPage() {
    return (
       
        <>
        <div className="bg-gray-100 flex">
      <Sidebar />
      <div className="bg-white  min-h-screen-100 w-5/6">
        <Header />
        <div className="flex items-center justify-center h-screen bg-white ">
      <div className=" md:w-full  bg-white rounded-lg  p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add Product Offering</h1>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="product-name" className="block text-sm font-medium text-gray-900">
                product offering
              </label>
              <input
                type="text"
                name="product-name"
                id="product-name"
                autoComplete="off"
                className="border-gray-300 border rounded-md py-2 px-3 w-3/5 focus:outline-none focus:ring-blue-500 focus:border-pink-500"
              />
            </div>
            
            
           
            
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-900">
                Category
              </label>
              <select
                id="category"
                name="category"
                className="border-gray-300 border rounded-md py-2 px-3 w-3/5 focus:outline-none focus:ring-blue-500 focus:border-pink-500"
              >
                <option value="">Select Category</option>
                <option value="cat1">Category 1</option>
                <option value="cat2">Category 2</option>
                <option value="cat3">Category 3</option>
              </select>
            </div>
            
            
            
           
            <div className="space-y-2">
              <label htmlFor="channel" className="block text-sm font-medium text-gray-900">
                Channel
              </label>
               <select
                id="product-specification"
                name="product-specification"
                className="border-gray-300 border rounded-md py-2 px-3 w-3/5  focus:outline-none focus:ring-blue-500 focus:border-pink-500"
              >
                <option value="">Select channel</option>
                <option value="spec1">channel 1</option>
                <option value="spec2">channel 2</option>
                <option value="spec3">channel 3</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="version" className="block text-sm font-medium text-gray-900">
              Start date

              </label>
              <input
                type="date"
                name="version"
                id="version"
                autoComplete="off"
                className="border-gray-300 border rounded-md py-2 px-3 w-3/5  focus:outline-none focus:ring-blue-500 focus:border-pink-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="product-specification" className="block text-sm font-medium text-gray-900">
                Product Specification
              </label>
              <select
                id="product-specification"
                name="product-specification"
                className="border-gray-300 border rounded-md py-2 px-3 w-3/5  focus:outline-none focus:ring-blue-500 focus:border-pink-500"
              >
                <option value="">Select Specification</option>
                <option value="spec1">Specification 1</option>
                <option value="spec2">Specification 2</option>
                <option value="spec3">Specification 3</option>
              </select>
            </div>
            
            
            <div className="col-span-2 space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="border-gray-300 border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-blue-500 focus:border-pink-500"
              ></textarea>
            </div>
            
           
            
          </div>
          <div className="flex justify-end">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
              Cancel
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
     
      </div>
    
    </div></>
    )}
  
  
