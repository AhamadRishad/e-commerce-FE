import axios from "axios";
import React, { useEffect, useState } from "react";
import displayINRCurrency from "../helpers/displayCurrency";

const DisplayAllReview = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllReview = async () => {
    try {
      console.log("productId  ::", productId);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/display-review`,
        {
          productId,
        },
        {
          withCredentials: true,
        }
      );
      const dataResponse = res.data;
      console.log("dataResponse", dataResponse);
      setReviews(dataResponse.reviews || []);
      console.log("reviews", reviews);
    } catch (error) {
      console.error(
        error.message || "Error fetching category products:",
        error
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllReview();
  }, [productId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4  dark:text-white">Product Reviews</h1>
      {loading ? (
        <p className="text-center dark:text-gray-300">Loading...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        reviews.map(({ review, productDetails }) => (
          <div
            key={review._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 flex flex-row gap-2"
          >
            <div className="  mb-4 md:mb-0">
              <img
                src={productDetails.image}
                alt={productDetails.productName}
                className="md:w-32 md:h-32 w-28 h-28 rounded-lg "
              />
            </div>
            <div className="lg:pl-4 pl-2 basis-4/5 justify-between ">
              <div>
                <h2 className="text-xl font-semibold dark:text-gray-200">
                  {productDetails.productName}
                </h2>
                <div className=" lg:flex lg:flex-row flex flex-col ">
                  <p className="text-gray-500 dark:text-gray-400 lg:mb-2 mr-1">Reviewer:</p>
                  <p className="text-gray-800 dark:text-gray-200 mb-2">{review.userEmail}</p>
                </div>
                <div className=" lg:flex lg:flex-row flex flex-col">
                  <p className="text-gray-500 dark:text-gray-400 lg:mb-2 mr-1">Review:</p>
                  <p className="text-gray-800 dark:text-gray-200 mb-2">{review.text}</p>
                </div>
              </div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400 mt-2 md:mt-0">
                Price: {displayINRCurrency(productDetails.price)}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayAllReview;
