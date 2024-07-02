import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { GrSearch } from "react-icons/gr";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle.jsx"
import LOGO from "../../assets/banner/LOGO E-Commerce.png"

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const adminToken = Cookies.get("AdminToken")
    if(adminToken){
      setIsLoggedIn(true);
    }
  })
  const handleLogOut = () => {
    Cookies.remove("AdminToken");
    setIsLoggedIn(false);
    navigate('/')
  }
  return (
    <header className="h-16 shadow-md bg-white dark:bg-gray-800 fixed w-full z-40">
      <div className="h-full  mx-auto flex items-center justify-between px-4">
        <div>
          <Link to={"/"}>
            {" "}
            <img
              className="h-12 max-w-sm rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30 dark:hover:shadow-white/30"
              src={LOGO}
              alt=""
            />{" "}
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border dark:border-2 rounded-full dark:bg-gray-600  pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-ful outline-none dark:bg-gray-600 dark:text-white "
          ></input>
          <div className="text-lg min-w-[50px] h-8 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className=" flex items-center gap-3">
          
        <ThemeToggle/>
       
        {
          isLoggedIn?(
            <button
            onClick={handleLogOut}
            className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
          ):(
            <div>
            <Link
              to={"/admin/login"}
              className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
            >
              Login
            </Link>
          </div>
          )
        }
         
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
