
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home.jsx"

import ForgetPassword from "../pages/user/ForgetPassword.jsx";
import Signup from "../pages/user/Signup.jsx";


import ManagerPanel from "../pages/manager/ManagerPanel.jsx";

import Login from "../pages/user/Login.jsx";
import AdminPanel from "../pages/admin/AdminPanel.jsx";
// import MyUploads from "../pages/admin/MyUploads.jsx";
import UploadCart from "../pages/admin/UploadCart.jsx";
import MyUploads from "../pages/admin/MyUploads.jsx";
import AdminSignup from "../pages/admin/AdminSignup.jsx";
import AdminLogin from "../pages/admin/AdminLogin.jsx";
import AdForgetPassword from "../pages/admin/AdForgetPassword.jsx";

const router= createBrowserRouter([
   {  
    path:"/",
    element:<App/>,
     children:[
        {
            //set user navbar and fooer to home define path as '/'
            // and remove '/' from app 
            path:"",
            element:<Home/>,
        },
        {
            path:"login",
            element:<Login/>
        },
        {
            path:"forgot-password",
            element:<ForgetPassword/>
        },
        {
            path:"sign-up",
            element:<Signup/>
        },
        
        // {
        //     path:"admin-panel",
        //     element:<AdminPanel/>,
        //     children:[

        //         {
        //             path:"upload-cart",
        //             element:<UploadCart/>,
        //         },
             
        //         // {
        //         //     path:"all-admin-products",
        //         //     element:<AdminAllProducts/>,
        //         // },
        //         {
        //             path:"manager-panel",
        //             element:<ManagerPanel/>,
        //             children:[
        //                 {
                            
        //                 }
        //             ]
        //         },
        //     ]
        // },
       
    ]     
},
{

    element:<AdminPanel/>,
    children:[
        {
            path:"/admin/my-upload",
            element:<MyUploads/>,
        },
        {
            path:"/admin/upload-cart",
            element:<UploadCart/>,
        },
        {
            path:"/admin/sign-up",
            element:<AdminSignup/>
        },
        {
            path:"/admin/login",
            element:<AdminLogin/>
        },
        {
            path:"/admin/forgot-password",
            element:<AdForgetPassword/>
        }



        
    ]
},
{
    // this is for manager
}


])

export default router;