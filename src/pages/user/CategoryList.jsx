import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  //  const fetchCategoryProduct = async () =>{
  //   setLoading(true)
  //     const res = await axios.get("http://localhost:3000/api/v1/user/all-single-category", {Credentials: true});
  //     const dataResponse = await res.json()
  //     setLoading(false)
  //     setCategoryProduct(dataResponse.data)
  //  }

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/all-single-category",
        { withCredentials: true }
      );
      const dataResponse = res.data;
      setCategoryProduct(dataResponse.data);
    } catch (error) {
      console.error("Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse" key={"categoryLoading"+index}>
                  {" "}
                </div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-category/" + product?.category}
                  className="cursor-pointer"
                  key={product.category+index}
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center"
                  >
                    <img
                      src={product?.image}
                      alt={product?.category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {product.brandName}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
