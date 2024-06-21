import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import displayINRCurrency from "../../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../../components/CategoryWiseProductDisplay";
import AddToCartButton from "../../helpers/AddToCartButton";
import BuyButton from "../../helpers/BuyButton";
import DisplayAllReview from "../../components/DisplayAllReview";
// import BuyButton from "../../helpers/BuyButton";

const CardProductDetails = () => {
  const [data, setData] = useState({
    productName: " ",
    brandName: "",
    price: "",
    sellingPrice: "",
    image: "",
    category: "",
    description: "",
    _id:""
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);

//   const productImageListLoading = new Array(4).fill(null)
  const productId = params.id;

  const fetchCardProductDetail = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/get-Card-details",
        {
          productId,
        },
        {
          withCredentials: true,
        }
      );

      const dataResponse = res.data;
      setLoading(false);
      setData(dataResponse.data);
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  useEffect(() => {
    fetchCardProductDetail();
  }, [params]);

  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4"> 
        {/**product image**/}
        <div className="h-96 flex flex-col items-center lg:flex-row-reverse gap-4 ">

            <div className="h-[360px] w-[360px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
              <img src={data?.image} alt="" className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"/>
            </div>

            {/* <div className="h-full">
                {
                    loading?(
                        <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                         {
                             productImageListLoading.map(el =>{
                                return(
                                    <div className="h-20 w-20 bg-slate-200 rounded" key={el}>
    
                                    </div>
                                )
                                
                            })
                         }
                        </div>
                       
                    ):(
                        <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                        {
                            //data.image fill multiple image later
                            productImageListLoading.map(el =>{
                               return(
                                   <div className="h-20 w-20 bg-slate-200 rounded " key={el}>
   
                                   </div>
                               )
                               
                           })
                        }
                       </div>
                    )
                   
                }
            </div> */}


        </div>
        {/**product detail**/}
        {
          loading?(
            <div className=" grid w-full gap-2">
           <p className=" bg-slate-200 animate-pulse rounded-full  inline-block h-6 w-full "></p>
           <h1 className="text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse  rounded-ful w-full"></h1>
           <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse w-full"></p>

           <div className="  flex items-center gap-1 bg-slate-200 h-6 animate-pulse  rounded-full w-full">
        
           </div>

           <div className="flex items-center gap2 text-2xl lg:text-3xl font-medium my-1 h-6 animate-pulse w-full">
            <p className="text-red-600 bg-slate-200 w-full"></p>
            <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
           </div>

            <div className="flex items-center gap-3 my-2 w-full"> 
            <button className="h-6 bg-slate-200 rounded  animate-pulse w-full"></button>
            <button className="h-6 bg-slate-200 rounded  animate-pulse w-full"></button>
           </div>

           <div className="w-full">
            <p className="text-slate-600 font-medium my-1 h-6 w-full bg-slate-200 rounded  animate-pulse"></p>
             <p className="  bg-slate-200 rounded w-full     animate-pulse"></p>
           </div>

        </div>
          ):(
            <div className=" flex flex-col gap- 1">
           <p className="bg-red-200 text-red-600 px-2 rounded-full  w-fit">{data?.brandName}</p>
           <h1 className="text-2xl lg:text-4xl font-medium">{data?.productName}</h1>
           <p className="capitalize text-slate-400">{data?.category}</p>

           <div className=" text-red-600 flex items-center gap-1">
           <FaStar/>
           <FaStar/>
           <FaStar/>
           <FaStar/>
           <FaStarHalf/>
           </div>

           <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
            <p className="text-red-600">{displayINRCurrency(data?.sellingPrice)}</p>
            <p className="text-slate-400 line-through">{displayINRCurrency(data?.price)}</p>
           </div>

            <div className="flex items-center gap-3 my-2">
              
            {/* <button className="border-2  border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white" navigate={'/cart'}>Buy</button> */}
            <BuyButton className="border-2  border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white" productId={data._id} />
            {/* <button className="border-2  border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:bg-white hover:text-red-600">Add To Cart</button> */}
           <AddToCartButton  className="border-2  border-red-600 rounded px-3 py-1 min-w-[120px] font-medium text-white bg-red-600 hover:bg-white hover:text-red-600" productId={data._id}   />  
           </div>

           <div>
            <p className="text-slate-600  font-medium my-1">Description:</p>
             <p className="max-w-[600px] ">{data.description}</p>
           </div>

        </div>
          )
        }

      </div>

      {
        data.category && (
          <CategoryWiseProductDisplay category={data.category} heading={"Recommended Product"}/> 
        )
      }
       <DisplayAllReview productId={productId}/>
    </div>
  );
};

export default CardProductDetails;
