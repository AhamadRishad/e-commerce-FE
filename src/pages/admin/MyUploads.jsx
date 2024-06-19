import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const MyUploads = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 

        

  useEffect(() => {
    const AdminToken = Cookies.get('AdminToken');

    const fetchProducts = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/admin/adminProduct', {}, {
          headers: {
            Authorization: `Bearer ${AdminToken}`
          },
          withCredentials: true // Ensure cookies are sent with the request
        });
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='py-3 px-4'>
      <div className='bg-white py-2 px-4 flex justify-between items-center rounded-full'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <Link to={'/admin/upload-cart'}>
          <button
            className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
          >
            Upload Product
          </button>
        </Link>
      </div>

      <div className="p-4 max-h-screen lg:max-h-[calc(100vh-8rem)] overflow-auto ">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-red-600">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Brand Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
                <th>
                  <div  scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Action
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                    {product.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                    {product.brandName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900  ">
                    {/* {product.description} */}
                    {truncateText(product.description, 25)}
                  </td>
                  <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-900 font-bold ">
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold"> */}

                    {product.image ? (
                      <img src={product.image} alt={product.productName} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      'No image'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                    {product.STATUS}
                  </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold flex justify-center items-center h-full">
                    <div className='flex gap-2 items-center pt-'>
                <Link to={`/admin/delete-product/${product._id}`} state={{product}} >  <MdDelete  className='text-red-600 h-6 w-6 hover:text-red-700 cursor-pointer' /> </Link> 
                  {/* <Link to={'/admin/edit-cart'}>   <FaEdit className='text-blue-600 h-5 w-5 hover:text-blue-700 cursor-pointer' /></Link>  */}
                  <Link to={`/admin/edit-cart/${product._id}`} state={{ product}}>   
                        <FaEdit className='text-blue-600 h-5 w-5 hover:text-blue-700 cursor-pointer' />
                      </Link> 
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyUploads;




























































// import React, { useEffect, useState } from 'react';
// import UploadCart from './UploadCart';
// import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Ensure axios is imported

// const MyUploads = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const token = Cookies.get('token');

//     const fetchProducts = async () => {
//       try {
//         const response = await axios.post('http://localhost:3000/api/v1/admin/adminProduct', {}, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           },
//           withCredentials: true // Ensure cookies are sent with the request
//         });
//         console.log(response.data);
//         setProducts(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching products:", err); // Add error logging
//         setError(err);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className='py-3 px-4'>
//       <div className='bg-white py-2 px-4 flex justify-between items-center'>
//         <h2 className='font-bold text-lg'>All Products</h2>
//         <Link to={'/admin/upload-cart'}>
//           <button
//             className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
//           >
//             Upload Product
//           </button>
//         </Link>
//       </div>

//       <div className="p-4 max-h-screen lg:max-h-[calc(100vh-8rem)] overflow-auto">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-red-600">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   #
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Product Name
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Brand Name
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Price
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Description
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Image
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {products.map((product, index) => (
//                 <tr key={index}>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {index + 1}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
//                     {product.productName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
//                     {product.brandName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
//                     {product.price}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
//                     {product.category}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
//                     {product.description}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
//                     {product.imageUrl ? (
//                       <img src={product.imageUrl} alt={product.productName} className="h-10 w-10 rounded-full object-cover" />
//                     ) : (
//                       'No image'
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
//                     {product.status}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MyUploads;





// import React, { useState } from 'react'
// import UploadCart from './UploadCart'

// const MyUploads = () => {
//   const [openUploadProduct,setOpenUploadProduct] = useState(false)

//   return (
//     <div className='py-3 px-4'> 
//      <div className='bg-white py-2 px-4 flex justify-between items-center'>
//              <h2 className='font-bold text-lg'>All Product</h2>
//              <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>
//               Upload Product</button>
            
//          </div>
//          {
//           openUploadProduct && (
//             <UploadCart onClose={()=> setOpenUploadProduct(false)}/>  
//           )
//          }
         
//          </div>
//   )
// }

// export default MyUploads

// import React, { useEffect, useState } from 'react'
// import UploadProduct from '../components/UploadProduct'
// import SummaryApi from '../common'
// import AdminProductCard from '../components/AdminProductCard'

// const AllProducts = () => {
//   const [openUploadProduct,setOpenUploadProduct] = useState(false)
//   const [allProduct,setAllProduct] = useState([])

//   const fetchAllProduct = async() =>{
//     const response = await fetch(SummaryApi.allProduct.url)
//     const dataResponse = await response.json()

//     console.log("product data",dataResponse)

//     setAllProduct(dataResponse?.data || [])
//   }

//   useEffect(()=>{
//     fetchAllProduct()
//   },[])
  
//   return (
//     <div>
//         <div className='bg-white py-2 px-4 flex justify-between items-center'>
//             <h2 className='font-bold text-lg'>All Product</h2>
//             <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
//         </div>

//         {/**all product */}
//         <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
//           {
//             allProduct.map((product,index)=>{
//               return(
//                 <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
                
//               )
//             })
//           }
//         </div>





//         {/**upload prouct component */}
//         {
//           openUploadProduct && (
//             <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
//           )
//         }
      

//     </div>
//   )
// }

// export default AllProducts