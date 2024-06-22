
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import displayINRCurrency from "../../helpers/displayCurrency";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const PurchaseDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState({});
  const [selectedProductID, setSelectedProductID] = useState('');
  const [selectedPaymentID, setSelectedPaymentID] = useState('');

  const handleTextareaChange = (productID, paymentID, e) => {
    setReview(prev => ({ ...prev, [productID]: e.target.value }));
  };

  const handleSubmit = async (e ,productID, paymentID) => {
    e.preventDefault();

    try {
      // Send the review to the backend
      const token = Cookies.get('token')
      const response = await axios.post(
        'http://localhost:3000/api/v1/user/add-review',
        { productID, reviewText:  review[productID], paymentID },
        {
          headers:{
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true,
        }
      );

      toast.success('Review submitted successfully');
      setReview(prev => ({ ...prev, [productID]: '' }));//to clear textarea
      
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
                            className="w-36 h-36 bg-slate-200  object-scale-down   p-2 mix-blend-multiply"
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

                                <form onSubmit={(e) => handleSubmit(e, cartItem.product, item._id)}>
                                <textarea
                                  className="rounded lg:w-80 dark:bg-slate-300 bg-slate-50 p-2 resize-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent scrollbar-none"
                                  placeholder="Add Review"
                                  value={review[cartItem.product] || ''}
                                  onChange={(e) => handleTextareaChange(cartItem.product, item._id, e)}
                                />
                                <div>
                                  <button type="submit" className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded ">
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
                  <div className="font-semibold ml-auto w-fit lg:text-lg min-w-[300px] dark:text-gray-700">
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
