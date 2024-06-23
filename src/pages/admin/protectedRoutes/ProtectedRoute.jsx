

import  {  useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';

const ProtectedRoute = ({children}) => {

  const navigate = useNavigate();

  useEffect(()=> {
    const AdminToken = Cookies.get("AdminToken")
    if(!AdminToken){
      navigate("/admin/login",{replace:true})
      return;
    }
    
    const checkUser = async () => {
      try {
        const AdminToken = Cookies.get('AdminToken')
        const res = await axios.get(
          // 'http://localhost:3000/api/v1/admin/check-admin', 
          `${import.meta.env.VITE_API_URL}/admin/check-admin`,
          {
            headers: {
              'Authorization': `Bearer ${AdminToken}`
             },
          },
          {
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