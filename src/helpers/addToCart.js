// import axios from "axios"
// import { toast } from "react-toastify"

// const addToCart = async(e,id) => {
  
//     e?.stopPropagation()
//     e?.preventDefault()
//     try {
//         const res = await axios.post(
//             "http://localhost:3000/api/v1/user/add-to-cart",
//             {
//                productId: id
//             },
//             {
//                withCredentials: true,
//             }
//         )
//         const responseData = res.data;
//         console.log(responseData)
//         if(responseData.success){
//             toast.success(responseData.message)
//         }

        
//     } catch (error) {
//         console.error("Error fetching Add to cart:", error);
//         toast.error(error.response.data.message)
//     }
   
// }

// export default addToCart