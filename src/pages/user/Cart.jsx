import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useCartStore from '../../stateManagement/cartStore';
import displayINRCurrency from '../../helpers/displayCurrency';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { totalProducts, fetchCartCount } = useCartStore();
  const loadingCart = new Array(totalProducts).fill(null);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/user-added-all-cart",
        {
          withCredentials: true,
        }
      );
      const dataResponse = res.data.userAllCart;
      setLoading(false); 
      setData(dataResponse);
      console.log(dataResponse)
    } catch (error) {
      console.error("Error fetching category products:", error);
    //   setLoading(false); 
    }
  };

  const fetchQtyOperator = async (productId, operator) => {
   console.log("productId :",productId)
   try { 
    const res = await axios.post(
      "http://localhost:3000/api/v1/user/add-quantity",
      {
        productId,
        operator
      },
      {
        withCredentials: true,
      }
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
  }


    const deleteCart = async (productId) => {
      setLoading(true)
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/user/delete-cart-from-user",
          {
            productId
          },
          {
            withCredentials: true,
          }
        )
        setLoading(false)
        fetchCartCount()
        fetchCart();
        toast.success('Removed product from Cart')
      } catch (error) {
        setLoading(false)
        toast.error(`Error removing ${error}`)
        console.error('Error deleting cart :', error);
      }
    }






 

  useEffect(() => {
    fetchCartCount(); // Fetch cart count first
    fetchCart(); // Fetch cart items
  }, [fetchCartCount]);

  const totalQty = data.reduce((previousValue,currentValue) => previousValue + currentValue.quantity,0)
  const totalPrice = data.reduce((previousValue,currValue) => previousValue + currValue.productDetails.price * currValue.quantity,0)

  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3'>
        {
          data.length === 0 && !loading && (
            <h1 className='text-center text-2xl border rounded m bg-white py-5 font-bold text-slate-500'>
              Cart is empty
            </h1>
          )
        }
      </div>

      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        {/*** view cart product */}
        <div className='w-full max-w-3xl'>
          {
            loading ? (
              loadingCart.map((_, index) => (
                <div
                  key={index}
                  className='w-full bg-slate-200 h-32 my-2 border border-slate-200 animate-pulse rounded'
                />
              ))
            ) : (
             data.map((product) => {
                return(
                    <div
                key={product?._id}
                className='w-full bg-white h-32 my-2 border border-slate-200  rounded grid grid-cols-[128px,1fr] ' >
                    <div className='w-32 h-32 bg-slate-200'>
                        <img src={product?.productDetails?.image} alt=""  className='w-full h-full object-scale-down mix-blend-multiply' />

                    </div>
                    <div className='px-4 py-2 relative'>
                      {/** delete product from cart */}
                      <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'> 
                      <MdDelete  onClick={() => deleteCart(product?.productDetails?._id)}/>
                      </div>
                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productDetails?.productName}</h2>
                        <p className='capitalized text-slate-500'>{product?.productDetails?.category}</p>
                        <div className='flex items-center justify-between'>
                        <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productDetails?.price)}</p>
                        <p className='text-slate-600  font-semibold text-lg'>{displayINRCurrency(product?.productDetails?.price * product.quantity)}</p>
                        </div>
                        <div className='flex items-center gap-3 mt-1'>
                            <button 
                              onClick={() => fetchQtyOperator(product?.productDetails?._id, 'minus')} 
                             className=' border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded '>-</button>
                            <span>{product.quantity}</span>
                            <button 
                              onClick={() => fetchQtyOperator(product?.productDetails?._id, 'plus')}
                             className=' border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded '>+</button>
                        </div>
                    </div>
                    
                </div>
                )
             })
            )
          }
        </div>
        {/***Total product */}
      <div className='mt- py-3 lg:mt-0 w-full max-w-sm'>
           {
              loading ? (
                  <div className='h-36 bg-slate-200 border rounded border-slate-300 animate-pulse'>
               
              </div>
              ):(
                  <div className='h-36 bg-white '>
                  <h2 className=' text-white bg-red-600 px-4 py-1'>Summary</h2>

                    <div className='flex items-center justify-between px-4 gap-2 mt-2 font-medium text-lg text-slate-600'>
                     <p>Quantity</p>
                     <p>{totalQty}</p>
                    </div>

                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                      <p>Total Price</p>
                      <p>{displayINRCurrency(totalPrice)}</p>                  
                    </div>

                    <button className=' bg-blue-600 p-2 mt-4 text-white w-full hover:bg-blue-700'>Payment</button>

                </div>
              )
           }
      </div>
      



      </div>
    </div>
  );
};

export default Cart;
