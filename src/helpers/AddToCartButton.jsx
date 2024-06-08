import React from 'react';
import useCartStore from '../stateManagement/cartStore';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddToCartButton = ({ productId }) => {
  const fetchCartCount = useCartStore((state) => state.fetchCartCount);

  const addToCart = async (e) => {
    e?.stopPropagation();
    e?.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/add-to-cart",
        { productId },
        { withCredentials: true }
      );
      const responseData = res.data;
      console.log(responseData);
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartCount(); // Fetch cart count after successful addition
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || "Error adding to cart");
    }
  };

  return (
    <button 
      className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full"
      onClick={addToCart}
    >
      Add to cart
    </button>
  );
};

export default AddToCartButton;
