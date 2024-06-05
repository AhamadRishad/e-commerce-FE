import React, { useState } from "react";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import DigitalMartLogo from "../assets/DigitalMart.jpg"

const Header = () => {
  const [menuDisplay,setMenuDisplay]= useState(false)


  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full  mx-auto flex items-center justify-between px-4">

        <div>
         <Link to={"/"}> <img className="h-12 max-w-sm rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30" src={DigitalMartLogo} alt="" />  </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full  pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-ful outline-none  "
          ></input>
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        

        <div className=" flex items-center gap-7">
          <div className='relative  flex justify-center shadow-lg'> 

          {
            // user._id &&    => edit when connected axios => if user is not available or not logged in dont show the FaRegCircleUser icon 
             (
              <div className="text-3xl cursor-pointer relative flex justify-center" 
              onClick={()=>setMenuDisplay(preve => !preve)}>
                <FaRegCircleUser />
              </div>
            )
          }
         
          {
            menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
               <nav>
                <Link to={"/admin/my-upload"} className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 rounded">Admin panel</Link>
               
               </nav>
              </div>
            )
          }
        
          </div>

          <div className="text-2xl cursor-pointer relative ">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>

          <div>
            <Link to={"/login"} className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">Login</Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;