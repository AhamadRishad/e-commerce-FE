
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home.jsx"
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel.jsx";
import AllAdmin from "../pages/AllAdmin.jsx";
import AdminAllProducts from "../pages/AdminAllProducts.jsx";
import ManagerPanel from "../pages/ManagerPanel.jsx";

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
                    path:"all-admins",
                    element:<AllAdmin/>,
                },
                {
                    path:"all-admin-products",
                    element:<AdminAllProducts/>,
                },
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
}
])

export default router;