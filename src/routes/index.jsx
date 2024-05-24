
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

const router= createBrowserRouter([
   {  
    path:"/",
    element:<App/>,
     children:[
        {
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
        {
            path:"admin-panel",
            element:<AdminPanel/>,
            children:[

                {
                    path:"upload-cart",
                    element:<UploadCart/>,
                },
             
                // {
                //     path:"all-admin-products",
                //     element:<AdminAllProducts/>,
                // },
                {
                    path:"manager-panel",
                    element:<ManagerPanel/>,
                    children:[
                        {
                            
                        }
                    ]
                },
            ]
        },
       
    ]     
},
// {
//     element:<ManagerPanel/>,
//     children:[
//         {
//             path:"all-admins",
//             element:<AllAdmin/>,
//         },
//     ]

// }
])

export default router;