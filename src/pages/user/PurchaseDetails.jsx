// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import displayINRCurrency from "../../helpers/displayCurrency";
// import Cookies from "js-cookie";

// const PurchaseDetails = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [review , setReview] = useState('');

//   const handleTextareaChange = (e) => {
//     setReview(e.target.value);
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send the review to the backend
//       const response = await axios.put(
//         'http://localhost:3000/api/v1/user/add-review',
//         { review,orderID }
//       );

//       console.log('Review submitted successfully:', response.data);
//       // Optionally, you can handle success message or redirect here
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       // Handle error state or display error message
//     }
//   };

//   const fetchPurchaseDetails = async () => {
//     const token = Cookies.get('token');
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         "http://localhost:3000/api/v1/payment/order-details",
//         {
//           headers:{
//            'Authorization': `Bearer ${token}`
//           }
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       const dataResponse = res.data;
//       setData(dataResponse.data);
//       setLoading(false);
//       console.log("dataResponse.data   :", dataResponse.data);
//     } catch (error) {
//       console.error("Error fetching category products:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPurchaseDetails();
//   }, []);
//   return (
//     <div>
//       {loading ? (
//         <div className="flex justify-center items-center h-screen">
//           <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
//           <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
//           <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
//           <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
//         </div>
//       ) : (
//         <>
//           {!data[0] && <p>No order available</p>}

//           <div className="p-4 w-full ">
//             {data.map((item, index) => (
//               <div key={index}>
//                 <p className="font-medium text-lg">
//                   {moment(item.date).format("LL")}
//                 </p>
//                 {/**product detailes */}
//                 <div className="border rounded ">
//                   <div className=" flex  flex-col lg:flex-row justify-between  dark:bg-gray-700">
//                     <div className="grid gap-1">
//                       {item.userAllCart.map((cartItem, index) => {
//                         return (
//                           <div key={index} className="flex gap-3 bg-slate-100 dark:bg-gray-700">
//                             <img
//                               src={cartItem.productDetails.image}
//                               alt=""
//                               className="w-28 h-28 bg-slate-200 object-scale-down p-2 mix-blend-multiply"
//                             />
//                             <div className=" "> 
//                               <div className="font-medium dark:text-white text-gray-900  text-lg text-ellipsis line-clamp-1">
//                                 {cartItem.productDetails.productName}
//                               </div>
//                               <div className="flex items-center gap-5 mt-1">
//                                 <div className="text-lg text-red-500">
//                                   {displayINRCurrency(
//                                     cartItem.productDetails.price
//                                   )}
//                                 </div>
//                                 <p>Quantity: {cartItem.quantity} </p>
//                               </div>
//                               <div>
//                                 <form action="handleSubmit">
//                                  <textarea 
//                                    className="rounded lg:w-80" 
//                                    placeholder="  Add Review"
//                                    value={review}
//                                    onChange={handleTextareaChange}
//                                    />
//                                       <button type="submit" className="btn btn-primary mt-2">
//                                          Submit Review
//                                           </button>
                               
//                                 </form>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>

//                     {/**payment detailes */}
//                     <div className="flex flex-col  gap-4 p-4 min-w-[300px]">
//                       <div>
//                         <div className="text-lg font-medium ">
//                           Payment Details :
//                         </div>
//                         <p className="  ml-1">
//                           Payment method : {item.paymentDetails.method}
//                         </p>
//                         <p className="  ml-1">payment status :paid</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/**shipping detailes is pending */}

//                   {/**total  amount */}
//                   <div className="font-semibold ml-auto w-fit lg:text-lg min-w-[300px]">
//                     Total Amount :{" "}
//                     {displayINRCurrency(item.paymentDetails.amount / 100)}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default PurchaseDetails;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import moment from "moment";
// import displayINRCurrency from "../../helpers/displayCurrency";
// import Cookies from "js-cookie";

// const PurchaseDetails = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [review, setReview] = useState('');
//   const [itemIdToUpdate, setItemIdToUpdate] = useState(null); // State to hold item ID being edited
//  console.log("itemIdToUpdate ::: ",itemIdToUpdate)
//   const handleTextareaChange = (e, itemId) => {
//     setReview(e.target.value);
//     setItemIdToUpdate(itemId); // Capture the item ID being edited
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send the review and item ID to the backend
//       const response = await axios.put(
//         'http://localhost:3000/api/v1/user/add-review',
//         { review, itemIdToUpdate }
//       );

//       console.log('Review submitted successfully:', response.data);
//       // Optionally, you can handle success message or redirect here

//       // Clear the review and itemIdToUpdate state after submission
//       setReview('');
//       setItemIdToUpdate(null);
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       // Handle error state or display error message
//     }
//   };

//   const fetchPurchaseDetails = async () => {
//     const token = Cookies.get('token');
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         "http://localhost:3000/api/v1/payment/order-details",
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         },
//         {
//           withCredentials: true,
//         }
//       );
//       const dataResponse = res.data;
//       setData(dataResponse.data);
//       setLoading(false);
//       console.log("dataResponse.data   :", dataResponse.data);
//     } catch (error) {
//       console.error("Error fetching category products:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPurchaseDetails();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <div className="flex justify-center items-center h-screen">
//           <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
//           <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
//           <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
//           <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
//         </div>
//       ) : (
//         <>
//           {!data[0] && <p>No order available</p>}

//           <div className="p-4 w-full">
//             {data.map((item, index) => (
//               <div key={index}>
//                 <p className="font-medium text-lg">
//                   {moment(item.date).format("LL")}
//                 </p>
//                 {/**product details */}
//                 <div className="border rounded">
//                   <div className="flex flex-col lg:flex-row justify-between dark:bg-gray-700">
//                     <div className="grid gap-1">
//                       {item.userAllCart.map((cartItem, cartIndex) => (
//                         <div key={cartIndex} className="flex gap-3 bg-slate-100 dark:bg-gray-700">
//                           <img
//                             src={cartItem.productDetails.image}
//                             alt=""
//                             className="w-28 h-28 bg-slate-200 object-scale-down p-2 mix-blend-multiply"
//                           />
//                           <div>
//                             <div className="font-medium dark:text-white text-gray-900 text-lg text-ellipsis line-clamp-1">
//                               {cartItem.productDetails.productName}
//                             </div>
//                             <div className="flex items-center gap-5 mt-1">
//                               <div className="text-lg text-red-500">
//                                 {displayINRCurrency(cartItem.productDetails.price)}
//                               </div>
//                               <p>Quantity: {cartItem.quantity} </p>
//                             </div>
//                             <div>
//                               <form onSubmit={handleSubmit}>
//                                 <textarea
//                                   className="rounded lg:w-80"
//                                   placeholder="Add Review"
//                                   value={review}
//                                   onChange={(e) => handleTextareaChange(e, cartItem._id)} // Pass item ID to handleTextareaChange
//                                 />
//                                 <button type="submit" className="btn btn-primary mt-2">
//                                   Submit Review
//                                 </button>
//                               </form>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/**payment details */}
//                     <div className="flex flex-col gap-4 p-4 min-w-[300px]">
//                       <div>
//                         <div className="text-lg font-medium">
//                           Payment Details :
//                         </div>
//                         <p className="ml-1">
//                           Payment method : {item.paymentDetails.method}
//                         </p>
//                         <p className="ml-1">payment status : paid</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/**shipping details (pending) */}

//                   {/**total amount */}
//                   <div className="font-semibold ml-auto w-fit lg:text-lg min-w-[300px]">
//                     Total Amount : {displayINRCurrency(item.paymentDetails.amount / 100)}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default PurchaseDetails;





import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import displayINRCurrency from "../../helpers/displayCurrency";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const PurchaseDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState('');
  const [selectedProductID, setSelectedProductID] = useState('');
  const [selectedPaymentID, setSelectedPaymentID] = useState('');

  const handleTextareaChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the review to the backend
      const token = Cookies.get('token')
      const response = await axios.post(
        'http://localhost:3000/api/v1/user/add-review',
        { productID: selectedProductID, reviewText: review, paymentID: selectedPaymentID },
        {
          headers:{
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true,
        }
      );

      toast.success('Review submitted successfully');
      setReview(''); // Clear the textarea
      
      console.log('Review submitted successfully:', response.data);
      // Optionally, you can handle success message or redirect here
    } catch (error) {
      toast.error('Error submitting review');
      console.error('Error submitting review:', error);
      // Handle error state or display error message
    }
  };

  const fetchPurchaseDetails = async () => {
    const token = Cookies.get('token');
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/payment/order-details",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        },
        {
          withCredentials: true,
        }
      );
      const dataResponse = res.data;
      setData(dataResponse.data);
      setLoading(false);
      console.log("dataResponse.data:", dataResponse.data);
    } catch (error) {
      console.error("Error fetching category products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseDetails();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
          <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
          <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
          <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
        </div>
      ) : (
        <>
          {!data[0] && <p>No order available</p>}

          <div className="p-4 w-full ">
            {data.map((item, index) => (
              <div key={index}>
                <p className="font-medium text-lg">
                  {moment(item.date).format("LL")}
                </p>
                <div className="border rounded bg-slate-300">
                  <div className="flex flex-col lg:flex-row justify-between dark:bg-gray-600">
                    <div className="grid gap-1  ">
                      {item.userAllCart.map((cartItem, cartIndex) => (
                        <div key={cartIndex} className="flex gap-3  ">
                          <div className="dark:bg-slate-200"> 
                        <img 
                            src={cartItem.productDetails.image}
                            alt=""
                            className="w-36 h-36 bg-slate-300 object-scale-down   p-2 mix-blend-multiply"
                          />
                          </div>
                        
                        
                          <div>
                            <div className="font-medium dark:text-white text-gray-900 text-lg text-ellipsis line-clamp-1 ">
                              {cartItem.productDetails.productName}
                            </div>
                            <div className="flex items-center gap-5 mt-">
                              <div className="text-lg text-red-500">
                                {displayINRCurrency(cartItem.productDetails.price)}
                              </div>
                              <p className="">Quantity: {cartItem.quantity}</p>
                            </div>
                            <div>
                              <form onSubmit={(e) => {
                                setSelectedProductID(cartItem.product);
                                setSelectedPaymentID(item._id);
                                handleSubmit(e);
                              }}>
                                <textarea
                                  className="rounded lg:w-80 dark:bg-slate-300 bg-slate-50"
                                  placeholder="  Add Review"
                                  value={review}
                                  onChange={handleTextareaChange}
                                />
                                <div> 
                                <button type="submit" className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                                  Submit Review
                                </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-4 p-4 min-w-[300px]">
                      <div>
                        <div className="text-lg font-medium">
                          Payment Details:
                        </div>
                        <p className="ml-1">
                          Payment method: {item.paymentDetails.method}
                        </p>
                        <p className="ml-1">Payment status: paid</p>
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold ml-auto w-fit lg:text-lg min-w-[300px]">
                    Total Amount:{" "}
                    {displayINRCurrency(item.paymentDetails.amount / 100)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseDetails;
