import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const truncateText = (text, maxLength = 10) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const ProductRequests = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActiveProduct = async (productID, status) => {
    if(status === 'action'){
      toast.info('select active or inactive')
      return;
    }
      try {
        const token = Cookies.get('token')
        const res = await axios.post(
          // "http://localhost:3000/api/v1/manager/active-product",
          `${import.meta.env.VITE_API_URL}/manager/active-product`,
          {
            productID: productID,
            status: status,
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            withCredentials: true,
          }
        );
  
        if (res.data.success) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== productID)
          );
  
          toast.success(res.data.message);
          console.log("message  : ", res.data.message);
  
          if (status === "active" ) {
            fetchProducts(); // Fetch the updated products if a product is activated or ignored
          }
        } else {
          console.error("Error updating product status:", res.data.message);
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error updating product status:", error);
        toast.error(error.response?.data?.message || "An error occurred");
      }
    };
  
    
    
  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('token')
      const response = await axios.get(
        // "http://localhost:3000/api/v1/manager/verify-product",
        `${import.meta.env.VITE_API_URL}/manager/verify-product`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
           },
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      const DATA = response.data.data;
      setProducts(DATA);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="py-3 px-4">
      {!loading && !products.length && <p>No Requests</p>}
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
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Brand Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th>
                    <div
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      Action
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500   dark:bg-gray-500 dark:text-black">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900 font-medium dark:bg-gray-400">
                      {truncateText(product.productName)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium dark:bg-gray-400">
                      {product.brandName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium dark:bg-gray-400">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900 font-medium dark:bg-gray-400">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900 dark:bg-gray-400">
                      {truncateText(product.description)}
                    </td>
                    <td className="px-4 py-1 whitespace-nowrap text-sm text-gray-900 font-bold dark:bg-gray-400">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        "No image"
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-900 dark:bg-gray-400">
                      {product.STATUS}
                    </td>
                    <td className="px- py- dark:bg-gray-400 text-md text-gray-900  ">
                      <div className="h-10 w-20 rounded grid text-center justify-center items-center dark:bg-gray-400">
                        <select
                          className="appearance-none font-medium row-start-1 col-start-1 bg-slate-200 hover:bg-slate-400 hover:text-white p-2 rounded dark:bg-slate-200 dark:hover:bg-gray-950 dark:hover:text-white"
                          onChange={(e) =>
                            fetchActiveProduct(product._id, e.target.value)
                          }
                          // value={product.STATUS}
                        >
                          <option value="action">Action</option>
                          <option value="inactive">inactive</option>
                          <option value="active">active</option>
                          <option value="ignore">ignore</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductRequests;
