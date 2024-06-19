// cartStore.js
import {create} from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie'

const useCartStore = create((set) => ({
  totalProducts: 0,
  fetchCartCount: async () => {
    const token = Cookies.get('token');
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/quantity-count",
        {
          header: {
            Authorization: `Bearer ${token}`,
          },
        },
        {
          withCredentials: true,
        }
      );
      const dataResponse = res.data;
      set({ totalProducts: dataResponse.totalProducts });
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  },
}));

export default useCartStore;
