// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import moment from 'moment';
// import displayINRCurrency from '../../helpers/displayCurrency';

// const AllOrder = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchPurchaseDetails = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         'http://localhost:3000/api/v1/manager/all-orders',
//         {
//           withCredentials: true,
//         }
//       );
//       const dataResponse = res.data;
//       setData(dataResponse.data);
//       setLoading(false);
//       console.log('dataResponse.data   :', dataResponse.data);
//     } catch (error) {
//       console.error('Error fetching category products:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPurchaseDetails();
//   }, []);

//   return (
//     <div className="h-screen overflow-y-auto scrollbar-none">
//       {loading ? (
//         <div className="flex justify-center items-center h-full gap-1">
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
//               <div key={index} className="mb-4">
//                 <p className="font-medium text-lg">
//                   {moment(item.date).format('LL')}
//                 </p>
//                 {/**product details */}
//                 <div className="border rounded bg-slate-300">
//                   <div className="flex flex-col lg:flex-row justify-between">
//                     <div className="grid gap-1">
//                       {item.userAllCart.map((cartItem, index) => {
//                         return (
//                           <div key={index} className="flex gap-3 bg-slate-300">
//                             <img
//                               src={cartItem.productDetails.image}
//                               alt=""
//                               className="w-28 h-28 bg-slate-300 object-scale-down p-2"
//                             />

                        

//                             <div>
//                               <div className="font-medium text-lg text-ellipsis line-clamp-1">
//                                 {cartItem.productDetails.productName}
//                               </div>
//                               <div className="flex items-center gap-5 mt-1">
//                                 <div className="text-lg text-red-500">
//                                   {displayINRCurrency(
//                                     cartItem.productDetails.price
//                                   )}
//                                 </div>
//                                 <p>Quantity: {cartItem.quantity}</p>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>

//                     {/**payment details */}
//                     <div className="flex flex-col gap-4 p-4 min-w-[300px]">
//                       <div>
//                         <div className="text-lg font-medium">Payment Details :</div>
//                         <p className="ml-1">Payment method : {item.paymentDetails.method}</p>
//                         <p className="ml-1">payment status :paid</p>
//                       </div>

//                       <div>
//                         <div className="text-lg font-medium">User Details :</div>
//                         <p className="ml-1">User : {item.userEmail}</p>
//                       </div>
//                     </div>
//                   </div>

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

// export default AllOrder;



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import displayINRCurrency from '../../helpers/displayCurrency';
import Cookies from 'js-cookie';

const AllOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPurchaseDetails = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('token')
      const res = await axios.get(
        'http://localhost:3000/api/v1/manager/all-orders',
        {
          headers: {
            'Authorization': `Bearer ${token}`
           },
        },
        {
          withCredentials: true,
        }
      );
      const dataResponse = res.data;
      setData(dataResponse.data);
      setLoading(false);
      console.log('dataResponse.data   :', dataResponse.data);
    } catch (error) {
      console.error('Error fetching category products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchaseDetails();
  }, []);

  return (
    <div className="h-screen overflow-y-auto scrollbar-none">
      {loading ? (
        <div className="flex justify-center items-center h-full gap-1">
          <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
          <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
          <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
          <div className="h-10 w-10 md:w-10 md:h-10 rounded-full overflow-hidden bg-slate-300 animate-pulse" />
        </div>
      ) : (
        <>
          {!data[0] && <p>No order available</p>}

          <div className="p-4 w-full mb-20">
            {data.map((item, index) => (
              <div key={index} className="mb-4 lg:p-4">
                <p className="font-medium text-lg">
                  {moment(item.date).format('LL')}
                </p>
                {/**product details */}
                <div className="border rounded bg-slate-300 p-4">
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="grid gap-1">
                      {item.userAllCart.map((cartItem, index) => {
                        const productDetails = cartItem.productDetails;
                        return (
                          <div key={index} className="flex gap-3 bg-slate-300">
                            {productDetails && productDetails.image ? (
                              <img
                                src={productDetails.image}
                                alt={productDetails.productName}
                                className="w-28 h-28 bg-slate-50  mix-blend-multiply object-scale-down p-2"
                              />
                            ) : (
                              <div className="w-28 h-28 bg-slate-300 p-2 flex items-center justify-center">
                                No image
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-lg text-ellipsis line-clamp-1">
                                {productDetails ? productDetails.productName : "Unknown Product"}
                              </div>
                              <div className="flex items-center gap-5 mt-1">
                                <div className="text-lg text-red-500">
                                  {productDetails ? displayINRCurrency(productDetails.price) : "N/A"}
                                </div>
                                <p>Quantity: {cartItem.quantity}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/**payment details */}
                    <div className="flex flex-col gap-4 p-4 min-w-[300px]">
                      <div>
                        <div className="text-lg font-medium">Payment Details :</div>
                        <p className="ml-1">Payment method : {item.paymentDetails.method}</p>
                        <p className="ml-1">Payment status : paid</p>
                      </div>

                      <div>
                        <div className="text-lg font-medium">User Details :</div>
                        <p className="ml-1">User : {item.userEmail}</p>
                      </div>
                    </div>
                  </div>

                  {/**total amount */}
                  <div className="font-semibold ml-auto w-fit lg:text-lg min-w-[300px] ">
                    Total Amount : {displayINRCurrency(item.paymentDetails.amount / 100)}
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

export default AllOrder;
