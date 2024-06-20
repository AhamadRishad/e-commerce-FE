import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import displayINRCurrency from "../../helpers/displayCurrency";
import Cookies from "js-cookie";

const PurchaseDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPurchaseDetails = async () => {
    const token = Cookies.get('token');
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/payment/order-details",
        {
          headers:{
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
      console.log("dataResponse.data   :", dataResponse.data);
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
                {/**product detailes */}
                <div className="border rounded ">
                  <div className=" flex  flex-col lg:flex-row justify-between">
                    <div className="grid gap-1">
                      {item.userAllCart.map((cartItem, index) => {
                        return (
                          <div key={index} className="flex gap-3 bg-slate-100">
                            <img
                              src={cartItem.productDetails.image}
                              alt=""
                              className="w-28 h-28 bg-slate-200 object-scale-down p-2"
                            />
                            <div>
                              <div className="font-medium text-lg text-ellipsis line-clamp-1">
                                {cartItem.productDetails.productName}
                              </div>
                              <div className="flex items-center gap-5 mt-1">
                                <div className="text-lg text-red-500">
                                  {displayINRCurrency(
                                    cartItem.productDetails.price
                                  )}
                                </div>
                                <p>Quantity: {cartItem.quantity} </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/**payment detailes */}
                    <div className="flex flex-col  gap-4 p-4 min-w-[300px]">
                      <div>
                        <div className="text-lg font-medium ">
                          Payment Details :
                        </div>
                        <p className="  ml-1">
                          Payment method : {item.paymentDetails.method}
                        </p>
                        <p className="  ml-1">payment status :paid</p>
                      </div>
                    </div>
                  </div>

                  {/**shipping detailes is pending */}

                  {/**total  amount */}
                  <div className="font-semibold ml-auto w-fit lg:text-lg min-w-[300px]">
                    Total Amount :{" "}
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
