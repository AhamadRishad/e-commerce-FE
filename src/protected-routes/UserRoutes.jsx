


import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      console.log("hitted to !token")
      navigate("/sign-up", { replace: true });
      return;
    }

    const checkUser = async () => {
      try {
        console.log("hitted to api token")
        const res = await axios.get("http://localhost:3000/api/v1/user/check-user", {
          withCredentials: true
        });
        const data = res.data;

        if (!data.success) {
          navigate("/sign-up", { replace: true });
        }
      } catch (error) {
        console.error("Error occurred while checking user:", error);
        navigate("/sign-up", { replace: true });
      }
    };

    checkUser();
  }, [navigate]);

  return children;
};

export default UserRoutes;


