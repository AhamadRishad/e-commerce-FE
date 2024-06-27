import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoClose, IoCloudUploadSharp } from "react-icons/io5";

const schema = yup.object().shape({
  productName: yup.string().required("Product Name is required"),
  brandName: yup.string().required("Brand Name is required"),
  price: yup.number().required("Price is required"),
  sellingPrice:yup.number().required(),
//   adminEmail: yup.string().required("Admin Email is required"),
//   image: yup.mixed(),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
});

const EditProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  const [allAdmins, setAllAdmins] = useState([]);
  const [productCategory, setProductCategory] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get(
          // "http://localhost:3000/api/v1/manager/get-admins"
          `${import.meta.env.VITE_API_URL}/manager/get-admins`
        );
        setAllAdmins(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          // "http://localhost:3000/api/v1/admin/categories"
           `${import.meta.env.VITE_API_URL}/admin/categories`
        );
        setProductCategory(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdmins();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      setValue("productName", product.productName);
      setValue("brandName", product.brandName);
      setValue("price", product.price);
      setValue("adminEmail", product.adminEmail);
      setValue("category", product.category);
      setValue("description", product.description);
      setValue("sellingPrice", product.sellingPrice);
      
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    const requestBody = {
      productName: data.productName,
      brandName: data.brandName,
      price: data.price,
      sellingPrice:data.sellingPrice,
      category: data.category,
      adminEmail: data.adminEmail,
      description: data.description,
    //   image: data.image[0],
  
    };

    try {
      await axios.put(
        // `http://localhost:3000/api/v1/admin/update-product/${id}`,
        `${import.meta.env.VITE_API_URL}/admin/update-product`,
        requestBody,
        {
          withCredentials: true,
          // headers: { "Content-Type": "multipart/form-data" }, have to add mutipartform data later 
        }
      );
      navigate("/admin/my-upload");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-2">
      <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-white dark:bg-gray-900 py-6 px-3 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl ml-4">Edit Product</h2>
            <div
              onClick={() => navigate('/admin/my-upload')}
              className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            >
              <IoClose />
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid p-4 gap-3 overflow-y-scroll h-full pb-5"
          >
            <input
              {...register("productName")}
              type="text"
              placeholder="Product Name"
              className="p-2 bg-slate-100 border rounded dark:bg-slate-400 dark:text-black  dark:placeholder-gray-950"
            />
            {errors.productName && <p className="text-red-600">{errors.productName.message}</p>}
            <input
              {...register("brandName")}
              type="text"
              placeholder="Brand Name"
              className="p-2 bg-slate-100 border rounded dark:bg-slate-400 dark:text-black dark:placeholder-gray-950"
            />
            {errors.brandName && <p className="text-red-600">{errors.brandName.message}</p>}
            <div className="flex flex-col lg:flex-row justify-between gap-4 w-full"> 
            <div className="flex-1"> 
            <input
              {...register("sellingPrice")}
              type="text"
              placeholder="selling price"
              className="p-2 bg-slate-100 border rounded w-full dark:text-black dark:bg-slate-400 dark:placeholder-gray-950"
            />
            {errors.sellingPrice && <p className="text-red-600">{errors.sellingPrice.message}</p>}
            </div>

            <div className="flex-1"> 
            <input
              {...register("price")}
              type="text"
              placeholder="Price"
              className="p-2 bg-slate-100 border rounded w-full dark:text-black dark:bg-slate-400 dark:placeholder-gray-950"
            />
            {errors.price && <p className="text-red-600">{errors.price.message}</p>}
            </div>
            </div>


 

            <div className="flex flex-col lg:flex-row justify-between gap-4 w-full">
              <div className="flex-1 w-full lg:w-1/2">
                <select
                  className="p-2 bg-slate-100 border rounded w-full dark:text-black dark:bg-slate-400 dark:placeholder-gray-950"
                  {...register("category")}
                >
                  <option  className="dark:text-gray-950" value="">Select Category</option>
                  {productCategory.map((cat) => (
                    <option  className="dark:text-gray-950" key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-600">{errors.category.message}</p>}
              </div>
              <div className="flex-1 w-full lg:w-1/2">
                <select
                  className="p-2 bg-slate-100 border rounded w-full dark:text-black dark:bg-slate-400 dark:placeholder-gray-950"
                  {...register("adminEmail")}
                >
                  <option  className="dark:text-gray-950" value="">Select Your Email</option>
                  {allAdmins.map((admin) => (
                    <option  className="dark:text-gray-950" key={admin.email} value={admin.email}>
                      {admin.email}
                    </option>
                  ))}
                </select>
                {errors.adminEmail && <p className="text-red-600">{errors.adminEmail.message}</p>}
              </div>
            </div>
            <label htmlFor="productImage">
              <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer dark:bg-slate-400 dark:placeholder-gray-950">
                <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                  <span className="text-4xl">
                    <IoCloudUploadSharp className="dark:text-gray-950" />
                  </span>
                  <p className="text-sm  dark:text-gray-950 ">Upload Product Image</p>
                  <input
                    id="productImage"
                    {...register("image")}
                    type="file"
                    className="hidden"
                  />
                  {errors.image && <p className="text-red-600">{errors.image.message}</p>}
                </div>
              </div>
            </label> 



            <textarea
              {...register("description")}
              placeholder="Enter product description"
              className="p-2 bg-slate-100 border rounded resize-none h-28  dark:bg-slate-400 dark:placeholder-gray-950 dark:text-black"
            />
            {errors.description && <p className="text-red-600">{errors.description.message}</p>}
            <input
              type="submit"
              className="bg-red-600 text-white  px-3 py-2 rounded hover:bg-red-700"
            />
             <button
             onClick={()=>navigate('/admin/my-upload')}
              className="bg-slate-200 text-black mb-10 px-3 py-2 rounded hover:bg-slate-700 dark:bg-slate-300 dark:hover:bg-slate-400"
             
            >Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;



