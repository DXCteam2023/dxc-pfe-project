// "use client"
// import React, { FormEventHandler, useRef, useState } from 'react'
// import { addPro } from '@/api';
// import { BiPlusCircle } from "react-icons/bi";
// import { useRouter } from 'next/navigation'
// import { IProductOfferingDocument } from '@/../server/models/productOffering'


// const addProduct = () => {
//   const router = useRouter();
//   const[id , setId] =useState<string>('');
//   const [products, setProducts] = useState<IProductOfferingDocument[]>([]);
//   const[name, setName]= useState<string>('');
//   const[state, setState]= useState<string>('In Draft');
//   const[productOfferingTerm, setProductOfferingTerm]= useState<string>('');
//   const[version, setVersion]= useState<string>('');
//   const[startDate, setStartDate]= useState<string>('');
//   const[category, setCategory ]= useState<[]>([]);
//   const[description, setDescription]= useState<string>('');
//   const[lastUpdate, setLastUpdate]= useState<string>('');
//   const [count, setCount] = useState(100);

//   const generateNumber = () => {
//     const formattedCount = String(count).padStart(5, '0');
//     const number = `PRDOF${formattedCount}`;
//     return number;
//   };

//   const handleSubmitNewPro: FormEventHandler<HTMLFormElement> = async (e) => {
//     e.preventDefault();
  
//     const newProduct: IProductOfferingDocument = {
//       number: generateNumber(),
//       category,
//       channel,
//       description,
//       externalId,
//       id,
//       internalId,
//       internalVersion,
//       lastUpdate,
//       name,
//       productCharacteristic,
//       productOfferingPrice,
//       productOfferingTerm,
//       productSpecification,
//       prodSpecCharValueUse,
//       validFor,
//       version,
//       state,
//     };
  
//     await addPro(newProduct);
  
//     setCount((prevCount) => prevCount + 1);
//     setProducts((prevProducts) => [...prevProducts, newProduct]);
  
//     setNewNameValue("");
//     setStatus("In Draft");
//     setNewRecurring(0);
//     setNewVersion(1);
//     setStartDate("");
  
//     setModalOpen(false);
//     router.refresh();
//   };
//     return (   
//       <div>
//       <button className="btn btn-primary w-full">Add new product<BiPlusCircle className='ml-2' size={18}/></button>     
//       </div>
//   )
// }

// export default addProduct
