import React, { useState } from 'react';
import UploadCart from './UploadCart';
import { Link } from 'react-router-dom';


const products = [
  // Sample product data
  {
    id: 1,
    productName: 'Product 1',
    brandName: 'Brand 1',
    price: '$100',
    category: 'Category 1',
    description: 'Description for product 1',
    imageUrl: 'https://via.placeholder.com/100',
    status: 'Out of Stock'
  },
  {
    id: 2,
    productName: 'Product 2',
    brandName: 'Brand 2',
    price: '$200',
    category: 'Category 2',
    description: 'Description for product 2',
    imageUrl: 'https://via.placeholder.com/100',
    status: 'Available'
  },
  // Add more products as needed
];

const MyUploads = () => {
  // const [openUploadProduct, setOpenUploadProduct] = useState(false);

  return (
    <div className='py-3 px-4'>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <Link to={'/admin/upload-cart'}> 
        <button
          className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
          // onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
        </Link>
      </div>
       
        
     



      <div className="p-4 max-h-screen lg:max-h-[calc(100vh-8rem)] overflow-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                  {product.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                  <img src={product.imageUrl} alt={product.productName} className="h-10 w-10 rounded-full object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                  {product.status}
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