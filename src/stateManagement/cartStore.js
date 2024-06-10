// cartStore.js
import {create} from 'zustand';
import axios from 'axios';

const useCartStore = create((set) => ({
  totalProducts: 0,
  fetchCartCount: async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/quantity-count",
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