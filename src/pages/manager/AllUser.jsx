import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

const truncateText = (text, maxLength = 10) => {
  if (text.length > maxLength) {
    return text.substring( maxLength,0) + '...';
  }
  return text;
};


const AllUser = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(
          // "http://localhost:3000/api/v1/manager/all-users",
          `${import.meta.env.VITE_API_URL}/manager/all-users`,
          {
            headers:{
              'Authorization': `Bearer ${token}`
            }
          },
          {
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );
        console.log(response.data);
        const DATA = response.data.data;
        setProducts(DATA);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className="py-3 px-4">
    <div className="max-h-screen lg:max-h-[calc(100vh-8rem)] overflow-auto">
      <div className="overflow-x-auto">
      {loading ? (
            <div className="flex justify-center items-center h-screen w-full">
              <div className="flex gap-1">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
                <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
                <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
                <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
              </div>
            </div>
          ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-red-600">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Mobile
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Hash Password
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Created At
              </th>
              <th>
                {/* <div
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Action
                </div> */}
              </th>
            </tr>
          </thead>

        
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:bg-gray-500 dark:text-black">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900 font-medium dark:bg-gray-400">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium dark:bg-gray-400">
                    {product.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium dark:bg-gray-400">
                    {product?.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900 font-medium dark:bg-gray-400">
                    {/* {product.description} */}
                    91+ {product.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900 dark:bg-gray-400">
                    {/* {product.hashPassword} */}
                    {truncateText(product.hashPassword)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900 dark:bg-gray-400">
                    {product.createdAt}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold flex justify-center items-center h-full">
                    <div className="flex gap-2 items-center pt-">
                      <Link
                        to={`/admin/delete-product/${product._id}`}
                        state={{ product }}
                      >
                        {" "}
                        <ImBlocked className="text-red-600 h-6 w-6 hover:text-red-700 cursor-pointer" />{" "}
                      </Link>
                      <Link to={'/admin/edit-cart'}>   <FaEdit className='text-blue-600 h-5 w-5 hover:text-blue-700 cursor-pointer' /></Link> 
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
         
        </table>
         )}
      </div>
    </div>
  </div>
  )
}

export default AllUser