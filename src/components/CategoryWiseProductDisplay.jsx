import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import AddToCartButton from "../helpers/AddToCartButton";
import scrollTop from "../helpers/scrollTop";

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadingList = new Array(13).fill(null);



  const fetchCategoryWiseProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/category-wise-products`,
        {
          category,
        },
        {
          withCredentials: true,
        }
      );
      const dataResponse = res.data;

      setData(dataResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  
  };

  useEffect(() => {
    fetchCategoryWiseProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 my-6 relative">
        {
            loading?(
                <div className="container mx-auto px-4 my-6 relative "> 
                <h2 className="text-2xl font-semibold p-4 animate-pulse rounded-full bg-slate-200 block"></h2>
                </div>
            ):(
                <h2 className="text-2xl font-semibold py-4">{heading}</h2>
            )
        }
     

      <div
        className=" lg:grid lg:grid-cols-[repeat(auto-fit,minmax(300px,320px))]
         flex gap-3 grid-cols-[repeat(auto-fit,minmax(200px,220px))] justify-between
           md:gap-6 overflow-x-scroll scrollbar-none transition-all"        
      >    
        {
        loading?(
            loadingList.map((_, index) => {
          return (
            <div key={index}
            className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ">
              <div className=" bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse">
               
              </div>
              <div className="p-4 grid gap-3    ">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200">
                 
                </h2>
                <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                <div className="flex gap-3">
                  <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2">
                   
                  </p>
                  <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2">
                 
                  </p>
                </div>
                <button className="text-sm px-3    animate-pulse rounded-full bg-slate-200 py-2">
                 
                </button>
              </div>
            </div>
          );
        })
        ):(
              data.map((product) => {
          return (
            <Link to={'/card-product-detail/'+product._id}  key={product._id} className="w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow " onClick={scrollTop}>
              <div className=" bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                <img
                  src={product?.image}
                  alt=""
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="p-4 grid gap-3    ">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {product?.productName}
                </h2>
                <p className="capitalize text-slate-500">{product?.category}</p>
                <div className="flex gap-3">
                  <p className="text-red-600 font-medium">
                    {displayINRCurrency(product?.price)}
                  </p>
                  <p className="text-slate-500 line-through">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                </div>
                {/* <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
                 onClick={(e)=>addToCart(e,product._id)}
                >
                  Add to cart
                </button> */}
                  <AddToCartButton className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full" productId={product._id} />
              </div>
            </Link>
          );
        })
        )
      
  
    }
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
