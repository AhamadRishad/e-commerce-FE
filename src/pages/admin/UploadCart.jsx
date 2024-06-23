



import React from "react";
import { IoClose, IoCloudUploadSharp } from "react-icons/io5";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
// import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    productName: yup.string().required(),
    brandName: yup.string().required(),
    price:yup.number(),
    sellingPrice:yup.number(),
    adminEmail: yup.string().required(),
    image: yup.mixed().required(),
    description: yup.string().required(),
    category: yup.string().required(), 
  })
  .required();

const UploadCart = () => {

  const navigate = useNavigate();
  const [AllAdmins, setAllAdmins] = useState([]);
  const [productCategory, setProductCategory] = useState([]);

  useEffect(() => {
    const admins = async () => {
      try {
        const res = await axios.get(
          // "http://localhost:3000/api/v1/manager/get-admins"
          `${import.meta.env.VITE_API_URL}/manager/get-admins`
        );
        const data = res.data;
        setAllAdmins(data);
      } catch (error) {
        console.error(error);
      }
    };
    admins();
  }, []);

  useEffect(() => {
    const categories = async () => {
      try {
        const res = await axios.get(
          // "http://localhost:3000/api/v1/admin/categories"
           `${import.meta.env.VITE_API_URL}/admin/categories`
        );
        const categoryData = res.data;
        setProductCategory(categoryData);
      } catch (error) {
        console.error(error);
      }
    };
    categories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const requestBody = {
      productName: data.productName,
      brandName: data.brandName,
      price: data.price,
      sellingPrice:data.sellingPrice,
      category: data.category,
      adminEmail: data.adminEmail,
      description: data.description,
      image: data.image[0],
      
    };
    console.log(requestBody)

    try {
      const res = await axios.post(
        // "http://localhost:3000/api/v1/admin/add-cart",
           `${import.meta.env.VITE_API_URL}/admin/add-cart`,
        requestBody,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("requestBody = ",requestBody);
      console.log("res.data",res.data);
      //toast success
      navigate("/admin/my-upload");
    } catch (error) {
      console.error(error);
      //toast failed
    }
  };

  return (
    <div className="p-2">
      <div className="fixed w-full h-full bg-slate-200 dark:bg-gray-900 dark:bg-opacity-35   bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-white dark:bg-gray-900 py-6 px-3 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl ml-4">Upload Product</h2>
            <div
              onClick={() => navigate('/admin/my-upload')}
              className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            >
              <IoClose />
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid p-4 gap-3 overflow-y-scroll h-full pb-5 "
          >
            <input
              {...register("productName")}
              type="text"
              placeholder="Product Name"
              className="p-2 bg-slate-100 dark:bg-slate-400 dark:text-black border dark:placeholder-gray-950 rounded "
            />
            {errors.productName && <p className="text-red-600">{errors.productName.message}</p>}
            <input
              {...register("brandName")}
              type="text"
              placeholder="Brand Name"
              className="p-2 bg-slate-100 border rounded dark:text-black dark:bg-slate-400 dark:placeholder-gray-950"
            />
            {errors.brandName && <p className="text-red-600">{errors.brandName.message}</p>}


            <div className="flex flex-col lg:flex-row justify-between gap-4 w-full"> 

            <div className="flex-1">
            <input
              {...register("sellingPrice")}
              type="text"
              placeholder="selling Price"
              className="p-2 bg-slate-100 border rounded w-full dark:text-black dark:bg-slate-400 dark:placeholder-gray-950"
            />
            {errors.sellingPrice && <p className="text-red-600">{errors.sellingPrice.message}</p>}
            </div>



            <div className="flex-1 ">

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
                  <option
                   className="dark:text-gray-950"
                  value="">Select Category</option>
                  { productCategory.map((product, index) => (
                    <option
                    className="dark:text-gray-950"
                     key={index} value={product.value}>
                      {product.label}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-600">{errors.category.message}</p>}
              </div>
              <div className="flex-1 w-full lg:w-1/2">
                <select
                  className="p-2 bg-slate-100 border rounded w-full dark:text-black  dark:bg-slate-400 dark:placeholder-gray-950"
                  {...register("adminEmail")}
                >
                  <option value="">Select Your Email</option>
                  {AllAdmins.map((admin, index) => (
                    <option 
                     className="dark:text-gray-950"
                    key={index} value={admin.email}>
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
                  <p className="text-sm dark:text-gray-950 ">Upload Product Image</p>
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
              className="p-2 bg-slate-100 border rounded resize-none h-28 dark:bg-slate-400 dark:placeholder-gray-950 dark:text-black"
            />
            {errors.description && <p className="text-red-600">{errors.description.message}</p>}
            <input
              type="submit"
              className="bg-red-600 text-white mb-10 px-3 py-2 rounded hover:bg-red-700 "
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadCart;





// import React from "react";
// import { IoClose, IoCloudUploadSharp } from "react-icons/io5";
// import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { MdDelete } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

// const schema = yup
//   .object({
//     productName: yup.string().required(),
//     brandName: yup.string().required(),
//     price: yup.string(),
//     adminEmail: yup.string().required(),
//     image: yup.mixed().required(),
//     description: yup.string().required(),
//     category: yup.string().required(), 
//   })
//   .required();

// const UploadCart = () => {

//   const navigate = useNavigate();

//   // const [imagePreviews, setImagePreviews] = useState([]);
//   const [AllAdmins, setAllAdmins] = useState([]);
//   const [productCategory, setProductCategory] = useState([]);
//   const [openUploadProduct, setOpenUploadProduct] = useState(true);

//   // const handleImageChange = (event) => {
//   //   const files = Array.from(event.target.files);
//   //   const newImagePreviews = [];

//   //   let filesLoaded = 0;

//   //   files.forEach((file) => {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       newImagePreviews.push(reader.result);
//   //       filesLoaded++;
//   //       if (filesLoaded === files.length) {
//   //         setImagePreviews((prevPreviews) => [
//   //           ...prevPreviews,
//   //           ...newImagePreviews,
//   //         ]);
//   //       }
//   //     };
//   //     reader.readAsDataURL(file);
//   //   });
//   // };
 
//   // const handleDeleteImage = (index) => {
//   //   setImagePreviews((prevPreviews) =>
//   //     prevPreviews.filter((_, i) => i !== index)
//   //   );
//   // };
  
 

 
//   useEffect(() => {
//     //add try catch to this api
//     const admins = async () => {
//       const res = await axios.get(
//         "http://localhost:3000/api/v1/admin/get-admins"
//       );
//       const data = await res.data;
//       console.log(data);
//       setAllAdmins(data);
//     };
//     admins();
//   }, []);

//   useEffect(()=> {
//     const categories = async () => {
//       const res = await axios.get(
//          "http://localhost:3000/api/v1/admin/categories"
//       );
//       const categoryData = await res.data;
//       console.log(categoryData);
//       setProductCategory(categoryData);
//     }
//     categories();
//   },[]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });

//   const onSubmit = async (data) => {
//     const requestBody = {
//       productName: data.productName,
//       brandName: data.brandName,
//       price: data.price,
//       category: data.category,
//       adminEmail: data.adminEmail,
//       description:data.description,
//       image: data.image[0],

//     }; // assuming data.image is a File object
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/v1/admin/add-cart",
//         requestBody,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
      
//       console.log(res.data);
//       navigate("/admin/my-upload");
//       //tost success
//     } catch (error) {
//       console.log(error);
//       //tost filed
//     }
//   };

//   return (
   
//     <div className="p-2 ">
//       <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
//         <div className="bg-white py-6 px-3 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">

//           <div className="flex justify-between items-center ">
//             <h2 className="font-bold text-xl ml-4">Upload Product</h2>
//             <div
//               // onClick={onClose}
//               onClick={() => setOpenUploadProduct(()=>{navigate('/admin/my-upload')})}
//               className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
//             >
//               <IoClose />
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="grid p-4 gap-3 overflow-y-scroll h-full pb-5"
//           >
//             <input
//               {...register("productName")}
//               type="text"
//               placeholder="Product Name"
//               className="p-2 bg-slate-100 border rounded"
//             />
//             {errors.productName && <p>{errors.productName.message}</p>}

//             <input
//               {...register("brandName")}
//               type="text"
//               placeholder="Brand Name"
//               className="p-2 bg-slate-100 border rounded"
//             />
//             {errors.brandName && <p>{errors.brandName.message}</p>}

//             <input
//               {...register("price")}
//               type="text"
//               placeholder="price"
//               className="p-2 bg-slate-100 border rounded"
//             />
//             {errors.price && <p>{errors.price.message}</p>}




          
//             <div className="flex justify-between gap-4 w-full">
//               <div className="flex-1 w-60">                
//                 <select
//                   className="p-2 bg-slate-100 border rounded w-full"
//                   {...register("category")}
//                 >
//                   <option value="">Select Category</option>
//                   {productCategory.map((product, index) => (
//                     <option key={index} value={product.value}>
//                       {product.label}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.category && <p className="text-red-600">{errors.category.message}</p>}
//               </div>

//               <div className="flex-1 w-60">
//                 <select
//                   className="p-2 bg-slate-100 border rounded w-full"
//                   {...register("adminEmail")}
//                 >
//                   <option value="">Select Your Email</option>
//                   {AllAdmins.map((admin, index) => (
//                     <option key={index} value={admin.email}>
//                       {admin.email}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.adminEmail && <p className="text-red-600">{errors.adminEmail.message}</p>}
//               </div>
//             </div>




//             {/* <div className="flex justify-between gap-4 w-full">

//               <div className=" flex-1 w-60">
                
//                 <select
//                   className="p-2 bg-slate-100 border rounded w-fll"
//                   {...register("category")}
//                 >
//                   <option
//                     className="p-2 bg-slate-100 border rounded w-fll"
//                     value={""}
//                   >
//                    Select Your Email
//                   </option>
//                   {productCategory.map((product, index) => (
//                     <option key={index} value={product.value}>
//                       {product.label}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.category && <p>{errors.category.message}</p>}
//               </div>

//               <div className=" flex-1 w-60">
                
//                 <select
//                   className="p-2 bg-slate-100 border rounded w-fll"
//                   {...register("adminEmail")}
//                 >
//                   <option
//                     className="p-2 bg-slate-100 border rounded "
//                     value={""}
//                   >
//                    Select Your Email
//                   </option>
//                   {AllAdmins.map((admin, index) => (
//                     <option key={index} value={admin.email}>
//                       {admin.email}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.adminEmail && <p>{errors.adminEmail.message}</p>}
//               </div>

//             </div> */}




//             <label htmlFor="productImage">
//               <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
//                 <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
//                   <span className="text-4xl">
//                     <IoCloudUploadSharp />{" "}
//                   </span>
//                   <p className="text-sm">Upload Product Image</p>
//                   <input
//                     id="productImage"
//                     {...register("image")}
//                     type="file"
//                     className="hidden"
                  

//                   />
//                   {errors.image && <p>{errors.image.message}</p>}
//                 </div>
//               </div>
//             </label>

 
//             {/* <div>
//               <div className="flex items-center gap-6 py-2 ">
//                 {imagePreviews.map((preview, index) => (
//                   <div className="relative group ">
//                     <img
//                       key={index}
//                       src={preview}
//                       alt={`Image Preview ${index + 1}`}
//                       className="group-hover:opacity-85 w-20 h-20 rounded"
//                     />
//                     <div
//                       className=" absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
//                       onClick={() => handleDeleteImage(index)}
//                     >
//                       <MdDelete />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div> */}


//             <textarea
//               {...register("description")}
             
//               placeholder="Enter product description"
//               className="p-1 bg-slate-100 border rounded resize-none h-28"
//             />
//             {errors.description && <p>{errors.description.message}</p>}

//             <input
//               type="submit"
//               className="bg-red-600 text-white mb-10 px-3 py-2 rounded hover:bg-red-700"
//             />
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadCart;