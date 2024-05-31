import React from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  console.log("Product ID:", id); 

  const deleteProduct = async () => {
   
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/admin/delete-product/${id}`,
         {
           withCredentials: true
         });
      console.log("Response:", res);
      console.log("Response data:", res.data);

      toast.success("Product deleted successfully");
      navigate("/admin/my-upload", { replace: true });
    } catch (error) {
      console.error("Error deleting product:", error);

    
      toast.error("Error deleting product");
    }
  };

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
        <div className="absolute top-2 right-2 cursor-pointer hover:text-red-700">
          <Link to={"/admin/my-upload"}>
            <IoClose className="h-7 w-6" />
          </Link>
        </div>
        <div className="flex justify-center mt-10">
          <MdDelete  className="h-20 w-20 text-red-500 hover:text-red-600" />
        </div>
        <div className="my-8 text-center">
          <h4 className="text-xl font-semibold">
            Are you sure you want to delete it?
          </h4>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            type="button"
            onClick={deleteProduct}
            className="px-6 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500"
          >
            Delete
          </button>
          <Link
            className="px-6 py-2.5 text-center rounded-md text-black text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
            to={"/admin/my-upload"}
          >
            <button type="button">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteProducts;
