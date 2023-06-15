"use client"

import { IProductOfferingDocument } from "@/../server/models/productOffering";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import "./form.css";
  const Product = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4;
    const [products, setProducts] = useState<IProductOfferingDocument[]>([]);
    useEffect(() => {
        fetchProducts();
      }, []); 
      const fetchProducts = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/product-offering/').then(data => data.json()).catch(e => console.log(e))
          console.log(res);
          setProducts(res);
        } catch (error) {
          console.error(error);
        }
      };
      const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber:any) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    return (
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const isActive = pageNumber === currentPage;
          const buttonClass = isActive ? 'active' : '';
  
          return (
            <button className="btn btn-primary"
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    );
  };  
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);
      
      
      return (
         <div className="relative overflow-x-auto shadow-md sm:rounded-lg" style={{ padding:60}}>
         <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                <th scope="col" className="px-6 py-3">Number</th>
                <th scope="col" className="px-6 py-3">Display Name</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Product Specification</th>
                <th scope="col" className="px-6 py-3">Version</th>
                <th scope="col" className="px-6 py-3">State</th>
                <th scope="col" className="px-6 py-3">Start Date</th>
                <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                {visibleProducts.map(product =>(
                    <tr key={product.id}>
                    <td className="px-6 py-4">{product.number}</td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.description}</td>
                    <td className="px-6 py-4">{product.productSpecification.name}</td>
                    <td className="px-6 py-4">{product.version}</td>
                    <td className="px-6 py-4">{product.state}</td>
                    <td className="px-6 py-4">{product.validFor.startDateTime}</td>
                    <td className="px-6 py-4" style={{ display: "flex", alignItems: "center" }}>
                    <FiEdit title='Edit' cursor='pointer' className='text-green-500' size={25}/>
                    <GrView title='View' cursor='pointer' className='text-blue-500' size={25}/>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
        {renderPageNumbers()}
      </div>
        </div>
    );



       
  }
  export default Product