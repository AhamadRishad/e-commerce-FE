
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import displayINRCurrency from "../../helpers/displayCurrency";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

const PurchaseDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, register, reset } = useForm();

  const onSubmit = async (formData) => {
    console.log("formdata  ::",formData)
    // Extract necessary fields from formData
    const reviews = Object.keys(formData)
      .filter(key => key.startsWith('review-'))
      .map(key => {
        const productIDKey = key.replace('review-', 'productID-');
        const paymentIDKey = key.replace('review-', 'paymentID-');
        return {
          productID: formData[productIDKey],
          reviewText: formData[key],
          paymentID: formData[paymentIDKey]
        };
      });
      console.log(  )
    // Send each review as a separate request
    try {
      const token = Cookies.get('token');
      for (const review of reviews) {
        if (review.reviewText) { // Only send reviews with text
          await axios.post(
            // 'http://localhost:3000/api/v1/user/add-review',
              `${import.meta.env.VITE_API_URL}/user/add-review`,
            review,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              },
              withCredentials: true,
            }
          );
        }
      }

      toast.success('Review(s) submitted successfully');
      reset();
      console.log('Reviews submitted successfully');
    } catch (error) {
      toast.error('Error submitting review(s)');
      console.error('Error submitting review(s):', error);
    }
  };

  const fetchPurchaseDetails = async () => {
    const token = Cookies.get('token');
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/payment/order-details`,
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
                    <div className="grid gap-1">
                      {item.userAllCart.map((cartItem, cartIndex) => (
                        <div key={cartIndex} className="flex gap-3">
                          <div className="dark:bg-slate-200"> 
                            <img 
                              src={cartItem.productDetails.image}
                              alt=""
                              className="w-36 h-36 bg-slate-200 object-scale-down p-2 mix-blend-multiply"
                            />
                          </div>
                          <div>
                            <div className="font-medium dark:text-white text-gray-900 text-lg text-ellipsis line-clamp-1">
                              {cartItem.productDetails.productName}
                            </div>
                            <div className="flex items-center gap-5 mt-">
                              <div className="text-lg text-red-500">
                                {displayINRCurrency(cartItem.productDetails.price)}
                              </div>
                              <p>Quantity: {cartItem.quantity}</p>
                            </div>
                            <div>
                              <form onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                  name={`review-${cartItem.product}-${item._id}`}
                                  control={control}
                                  defaultValue=""
                                  render={({ field }) => (
                                    <textarea
                                      {...field}
                                      className="rounded lg:w-80 dark:bg-slate-300 bg-slate-50 p-2 resize-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent scrollbar-none"
                                      placeholder="Add Review"
                                    />
                                  )}
                                />
                                <input type="hidden" {...register(`productID-${cartItem.product}-${item._id}`)} value={cartItem.product} />
                                <input type="hidden" {...register(`paymentID-${cartItem.product}-${item._id}`)} value={item._id} />
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
                  <div className="font-semibold ml-auto w-fit lg:text-lg min-w-[300px] dark:text-gray-700">
                    Total Amount: {displayINRCurrency(item.paymentDetails.amount / 100)}
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
