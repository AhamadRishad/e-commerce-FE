import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserRoutes = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/user/check-user",
          {
            withCredentials: true,
          },
        );

        const data = res.data;
        console.log(data);
        
        if (data.success === false) {
          navigate("/user/signup", { replace: true });
        }
      } catch (error) {
        console.error("Error occurred while checking user:", error);
        navigate("/user/signup", { replace: true });
      }
    };
    checkUser();
  }, [navigate]);

  return children;
};

export default UserRoutes;




// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UserRoutes = ({ children }) => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3000/api/v1/user/check-user",
//           {
//             withCredentials: true,
//           },
//         );

//         const data = res.data;
//         console.log(data);
        
//         if (data.success === false) {
//           navigate("/user/signup", { replace: true });
//         } else {
//           setLoading(false); // User is authenticated, stop loading
//         }
//       } catch (error) {
//         console.error("Error occurred while checking user:", error);
//         navigate("/user/signup", { replace: true });
//       }
//     };
//     checkUser();
//   }, [navigate]);

//   if (loading) {
//     return <div>Loading...</div>; // Optionally display a loading indicator
//   }

//   return children;
// };

// export default UserRoutes;
