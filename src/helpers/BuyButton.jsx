import axios from 'axios';
import React from 'react'
import { toast } from 'react-toastify';
import useCartStore from '../stateManagement/cartStore';
import { useNavigate } from 'react-router-dom';

const BuyButton = ({productId , className}) => {
    const navigate = useNavigate();

    const fetchCartCount = useCartStore((state) => state.fetchCartCount);

    const buyProduct = async () => {
       
    
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
            fetchCartCount();
            navigate('/cart')
             // Fetch cart count after successful addition
          }
          
        } catch (error) {
            navigate('/cart')
          console.error("Error adding to cart:", error);
          toast.error(error.response?.data?.message || "Error adding to cart");
        }
      };
  return (
    <button 
    className={className}
    onClick={buyProduct}
  >
    Buy
  </button>
  )
}

export default BuyButton