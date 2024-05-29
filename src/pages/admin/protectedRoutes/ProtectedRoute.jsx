// import React, { useContext } from 'react'
// import { AuthContext } from './AuthProvider'
// import { Navigate } from 'react-router-dom'

// const ProtectedRoute = ({children}) => {
//     const {isAuthenticated } = useContext(AuthContext)

//     if(!isAuthenticated){
//         return <Navigate to="/admin/login"/>;
//     }
//   return children;
  
// }

// export default ProtectedRoute;


import  {  useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

const ProtectedRoute = ({children}) => {

  const navigate = useNavigate();

  useEffect(()=> {
    const token = Cookies.get("token")
    if(!token){
      navigate("/admin/login",{replace:true})
      return;
    }
    
    const checkUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/admin/check-admin', {
          withCredentials: true
        })
        const data = res.data;
        if(!data.success){
          navigate("/admin/login",{replace:true})
        }
      } catch (error) {
        console.error("Error occurred while checking admin:", error);
        navigate("/admin/login",{replace:true})
      }
    }
    checkUser();
  },[navigate]);
  return children;
}

export default ProtectedRoute