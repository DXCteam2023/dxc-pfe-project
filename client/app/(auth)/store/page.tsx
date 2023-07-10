// "use client";
// import React, { useState, useEffect, SyntheticEvent } from "react";

// export default async function storepage() {

//     const data = [{
//         id: 1,
//         name: 'Mobile Plan with data, voice and sms starting',
//         description: 'voice description',
//         price: '1468 $',
//         image: 'https://images.pexels.com/photos/4526429/pexels-photo-4526429.jpeg'
//     },
//     {
//         id: 2,
//         name: 'Mobile Plan',
//         description: 'Mobile Plan description',
//         price: '2668 $',
//         image: 'https://images.pexels.com/photos/8829445/pexels-photo-8829445.jpeg'
//     },
//     {
//         id: 3,
//         name: 'SD-WAN My Device',
//         description: 'SD-WAN  description',
//         price: '358 $',
//         image: 'https://images.pexels.com/photos/1738644/pexels-photo-1738644.jpeg'
//     },
//     {
//         id: 4,
//         name: 'Mobile Plan with data',
//         description: 'Mobile description',
//         price: '968 $',
//         image: 'https://images.pexels.com/photos/267392/pexels-photo-267392.jpeg'
//     }

//     ]
//     const [Cart, setcart] = useState(0)

//     return (

     
//         <div className="container">
//             <h1>Cart : {Cart}</h1>
//             <div className="grid sm:grid-cols-1 gap-4 md:grid-cols-4">
//             {data.map((e)=>{
//         return(<div key={e.id}>
//             <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//                 <a href="#">
//                     <img className="p-8 rounded-t-lg" src={e.image} alt="product image" />
//                 </a>
//                 <div className="px-5 pb-5">
//                     <a href="#">
//                         <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{e.name}</h5>
//                     </a>
//                     <div className="flex items-center mt-2.5 mb-5">
//                         <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
//                         <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
//                         <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
//                         <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
//                         <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
//                         <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <span className="text-3xl font-bold text-gray-900 dark:text-white">{e.price}</span>
//                         <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Add to cart</a>
//                     </div>
//                 </div>
//             </div>
//             </div>
// );})}
// </div>
//         </div>
//         // onClick={()=> setcart(Cart+1)}
//     );
// }
