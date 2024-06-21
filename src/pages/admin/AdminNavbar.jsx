import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { Link } from "react-router-dom";
import DigitalMartLogo from "../../assets/DigitalMart.jpg";
import ThemeToggle from "../../components/ThemeToggle.jsx"

const AdminNavbar = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  return (
    <header className="h-16 shadow-md bg-white">
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
          ></input>
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className=" flex items-center gap-7">
        <ThemeToggle/>
          <div>
            <Link
              to={"/admin/login"}
              className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
