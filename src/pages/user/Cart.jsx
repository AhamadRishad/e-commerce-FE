


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useCartStore from '../../stateManagement/cartStore';
import { toast } from 'react-toastify';
import displayINRCurrency from '../../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';
import scrollTop from '../../helpers/scrollTop'

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { totalProducts, fetchCartCount } = useCartStore();
  const loadingCart = new Array(totalProducts).fill(null);
 

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('token');
      const res = await axios.get(
        // "http://localhost:3000/api/v1/user/user-added-all-cart",
        `${import.meta.env.VITE_API_URL}/user/user-added-all-cart`,
        {
          headers:{
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        },
        { withCredentials: true }
      );
      const dataResponse = res.data.userAllCart;
      setLoading(false); 
      setData(dataResponse);
      scrollTop();
      console.log(dataResponse)
    } catch (error) {
      console.error("Error fetching category products:", error);
      setLoading(false); 
    }
  };

  const fetchQtyOperator = async (productId, operator) => {
    // console.log("productId :", productId)
    const token = Cookies.get('token')
    try { 
      const res = await axios.post(
        // "http://localhost:3000/api/v1/user/add-quantity",
        `${import.meta.env.VITE_API_URL}/user/add-quantity`,
        { productId, operator },
        {
          headers:{
          
           ' Authorization': `token ${token}`            
          },
          withCredentials: true

        },
       
        // { withCredentials: true }
      );
      setData(prevData =>
        prevData.map(item =>
          item.product === productId
            ? {
                ...item,
                quantity: operator === 'plus' ? item.quantity + 1 : Math.max(item.quantity - 1, 1)
              }
            : item
        )
      );
      console.log('Updated cart:', res.data);
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

 




  const deleteCart = async (productId) => {
    const token = Cookies.get('token')
    setLoading(true)
    try {
      const res = await axios.post(
        // "http://localhost:3000/api/v1/user/delete-cart-from-user",
        `${import.meta.env.VITE_API_URL}/user/delete-cart-from-user`,
        { productId },
        {
          headers:{
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
         withCredentials:true
        },
       
       
      );
      setLoading(false)
      fetchCartCount()
      fetchCart();
      toast.success('Removed product from Cart')
    } catch (error) {
      setLoading(false)
      toast.error(`Error removing ${error}`)
      console.error('Error deleting cart :', error);
    }
  };





  const handlePayment = async () => {
    // const totalPrice = data.reduce((previousValue, currValue) => previousValue + currValue.productDetails.price * currValue.quantity, 0);
    const orderData = {
      amount: totalPrice, // Amount in paise
    };
  
    try {
      const res = await axios.post(
        // "http://localhost:3000/api/v1/payment/order",
        `${import.meta.env.VITE_API_URL}/payment/order`,
         orderData);
      const order = res.data.data;
      const options = {
        key: import.meta.env.VITE_SOME_KEY, // Enter the Key ID generated from the Dashboard
        amount: order.amount,
        currency: order.currency,
        name: 'rishad',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async (response) => {
          try {
            const token = Cookies?.get('token');
            console.log('token :',token)
            const verifyApi = await axios.post(
              // 'http://localhost:3000/api/v1/payment/payment-verify',
              `${import.meta.env.VITE_API_URL}/payment/payment-verify`,
               {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
          {
            headers: {
              'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
               },
               withCredentials: true,
  
          }
        );
            console.log("verifyApi:", verifyApi);
            toast.success('Payment Successful');
            fetchCart();
            fetchCartCount()
          } catch (error) {
            console.error('Error verifying payment:', error);
            toast.error('Error verifying payment');
          }
        },
        prefill: {
          name: 'Rishad',
          email: 'rishad@gmail.com',
          contact: '1234567843',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#F37254',
        },
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      toast.error('Error creating Razorpay order');
    }
  };
  



  useEffect(() => {
    fetchCartCount(); // Fetch cart count first
    fetchCart(); // Fetch cart items
  }, [fetchCartCount]);

  const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
  const totalPrice = data.reduce((previousValue, currValue) => previousValue + currValue.productDetails.price * currValue.quantity, 0);

  return (
    <div className='container mx-auto '>
      <div className='text-center text-lg my-3 '>
        {data.length === 0 && !loading && (
          <> 
          <h1 className='text-center text-2xl  rounded m bg-white dark:bg-gray-600 dark:text-white py-5 font-bold text-slate-500'>
            Cart is empty
          </h1>
          <h2>
            <Link className='text-center text-md  rounded m bg-white px-2 underline  text-slate-500 mt- hover:bg-slate-500 hover:text-white' to={'/see-all-orders'}>See all Orders</Link>
          </h2>
          </>
        )}
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/*** view cart product */}
        <div className='w-full max-w-3xl'>
          {loading ? (
            loadingCart.map((_, index) => (
              <div
                key={index}
                className='w-full bg-slate-200 h-32 my-2 border border-slate-200 animate-pulse rounded'
              />
            ))
          ) : (
            data.map((product) => {
              return (
                <div
                  key={product?._id}
                  className='w-full dark:bg-gray-800 h-32 my-2 border border-slate-200 dark:border-slate-700  rounded grid grid-cols-[128px,1fr]'>
                  <div className='w-32 h-32 bg-slate-200'>
                    <img src={product?.productDetails?.image} alt="" className='w-full h-full object-scale-down mix-blend-multiply' />
                  </div>
                  <div className='px-4 py-2 relative'>
                    {/** delete product from cart */}
                    <div className='absolute right-0 text-red-600 dark:text-red-500 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'>
                      <MdDelete onClick={() => deleteCart(product?.productDetails?._id)} />
                    </div>
                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1  dark:text-slate-200'>{product?.productDetails?.productName}</h2>
                    <p className='capitalized text-slate-500 dark:text-slate-400'>{product?.productDetails?.category}</p>
                    <div className='flex items-center justify-between'>
                      <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productDetails?.price)}</p>
                      <p className='text-slate-600 dark:text-slate-200 font-semibold text-lg'>{displayINRCurrency(product?.productDetails?.price * product.quantity)}</p>
                    </div>
                    <div className='flex items-center gap-3 mt-1'>
                      <button
                        onClick={() => fetchQtyOperator(product?.productDetails?._id, 'minus')}
                        className='border border-red-600 text-red-600 dark:text-red-500 dark:border-red-500 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'>-</button>
                      <span className='  dark:text-slate-200'>{product.quantity}</span>
                      <button
                        onClick={() => fetchQtyOperator(product?.productDetails?._id, 'plus')}
                        className='border border-red-600 text-red-600 hover:bg-red-600 dark:text-red-500 dark:border-red-500 hover:text-white w-6 h-6 flex justify-center items-center rounded'>+</button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/***Total product */}
      
        {
          data[0] && (

            <div className='mt- py-3 lg:mt-0 w-full max-w-sm'>
            {loading ? (
              <div className='h-36 bg-slate-200 border rounded border-slate-300 dark:border-slate-400 animate-pulse'>
              </div>
            ) : (
              <> 
              <div className='h-36 bg-white dark:bg-gray-800'>
                
                <h2 className='text-white bg-red-600 px-4 py-1'>Order Summary</h2>
                <div className='flex items-center justify-between px-4 gap-2 mt-2 font-medium text-lg text-slate-600 dark:text-slate-200'>
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600 dark:text-slate-200'>
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>
                <button className='bg-blue-600 p-2 mt-4 text-white w-full hover:bg-blue-700' onClick={() => handlePayment()}>Payment</button>
              </div>
              <Link to={'/see-all-orders'}> 
              <h1 className='pt-4 lg:text-right  text-lg font-medium  rounded m  px-2 underline dark:text-slate-200 dark:hover:text-slate-400  text-slate-500  hover:text-slate-700 '>Order Details</h1>
              {/**Order details replace to navbar or align proper here  */}
              </Link>
              </>
            )}
          </div>
          )
        }
       
      </div>
    </div>
  );
};

export default Cart;
