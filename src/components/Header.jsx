import React, { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DigitalMartLogo from "../assets/DigitalMart.jpg";
import useCartStore from "../stateManagement/cartStore";
import Cookies from "js-cookie";
import axios from "axios";
import ThemeToggle from "./ThemeToggle";
import { toast } from "react-toastify";


const Header = () => {
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);

  const { totalProducts, fetchCartCount } = useCartStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const [isManager, setIsManager] = useState("general");

  // console.log('searchInput :',searchInput?.search.split('=')[1])

  const fetchIsManagerORGeneral = async () => {
    try {
      const token = Cookies.get('token')
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/check-manager",
      {
        headers: {
          'Authorization': `Bearer ${token}`
         },
      },
        {
          withCredentials: true,
        }
      );
      const dataResponse = res.data.data;
      setIsManager(dataResponse);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchIsManagerORGeneral();
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    }

    fetchCartCount();
  }, [fetchCartCount]);

  const handleLogout = () => {
    // create an api to remove token
    toast.success('LogOut success');
    Cookies.remove("token");
    setIsLoggedIn(false);
    
    alert('succs')
    navigate("/login", { replace: true });
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };
  return (
    <header className="h-16 shadow-md bg-white fixed w-full  z-40">
      <div className="h-full  mx-auto flex items-center justify-between px-4">
        <div>
          <Link to={"/"}>
            {" "}
            <img
              className="h-12 max-w-sm rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
              src={DigitalMartLogo}
              alt=""
            />{" "}
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full  pl-2">
          <input
            type="text"
            placeholder="search product here..."
            className="w-ful outline-none  "
            onChange={handleSearch}
            value={search}
          ></input>
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch className="text-gray-900 dark:text-gray-900" />
          </div>
        </div>

        <div className=" flex items-center lg:gap-7 gap-3">
          <div className="relative  flex justify-center shadow-lg rounded-full">
            {
              // user._id &&    => edit when connected axios => if user is not available or not logged in dont show the FaRegCircleUser icon
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                <FaRegCircleUser  className="text-gray-900 dark:text-gray-900"/>
              </div>
            }

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {isManager === "manager" ? (
                    <Link
                      to={"/manager-panel"}
                      className="whitespace-nowrap  md:block dark:hover:bg-slate-200 dark:hover:text-gray-900 dark:bg-gray-900 hover:bg-slate-100 p-2 rounded"
                    >
                      Manager Panel
                    </Link>
                  ) : (
                    <Link
                      to={"/admin/my-upload"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 rounded"
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          <Link to={"/cart"} className="text-2xl cursor-pointer relative ">
            <span>
              <FaShoppingCart className="text-gray-900 dark:text-gray-900"/>
            </span>
            <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">{totalProducts}</p>
            </div>
          </Link>

          <ThemeToggle/>

          {/* <div>
            <Link to={"/login"} className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">Login</Link>
          </div> */}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to={"/login"}
              className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
