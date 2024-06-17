
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home.jsx"

import ForgetPassword from "../pages/user/ForgetPassword.jsx";
import Signup from "../pages/user/Signup.jsx";



import Login from "../pages/user/Login.jsx";
import AdminPanel from "../pages/admin/AdminPanel.jsx";
import UploadCart from "../pages/admin/UploadCart.jsx";
import MyUploads from "../pages/admin/MyUploads.jsx";
import AdminSignup from "../pages/admin/AdminSignup.jsx";
import AdminLogin from "../pages/admin/AdminLogin.jsx";
import AdForgetPassword from "../pages/admin/AdForgetPassword.jsx";
import UserRoutes from "../pages/user/protected-routes/UserRoutes.jsx";
import ProtectedRoute from "../pages/admin/protectedRoutes/ProtectedRoute.jsx";
import EditProducts from "../pages/admin/EditProducts.jsx";
import DeleteProducts from "../pages/admin/DeleteProducts.jsx";
import CategoryProduct from "../pages/user/CategoryProduct.jsx";
import CardProductDetails from "../pages/user/CardProductDetails.jsx";
import Cart from "../pages/user/Cart.jsx";
import SearchProduct from "../pages/user/SearchProduct.jsx";
import PurchaseDetails from "../pages/user/PurchaseDetails.jsx";


const router= createBrowserRouter([
  {
    path:"login",
    element:<Login/>
  },
  {
    path:"sign-up",
    element:<Signup/>
},
   {  
   
    element:
    (
        <UserRoutes> 
            <App/> 
            </UserRoutes>
    ),
     children:[
        {
         
            path:"/",
            element:<Home/>
        },
        {
            path:"product-category",
            element:<CategoryProduct/>
        },
        {
            path:"card-product-detail/:id",
            element:<CardProductDetails/>
        },
        {
            path:"cart",
            element:<Cart/>
        },
        {
            path:"search",
            element:<SearchProduct/>
        },
        {
            path:"see-all-orders",
            element:<PurchaseDetails/>
        },
     
        {
            path:"forgot-password",
            element:<ForgetPassword/>
        },
        // {
        //     path:"sign-up",
        //     element:<Signup/>
        // },
    ]     
},

// {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />
//       },
//       {
//         path: "product-category",
//         element: (
//           <UserRoutes>
//             <CategoryProduct />
//           </UserRoutes>
//         )
//       },
//       {
//         path: "card-product-detail/:id",
//         element: (
//           <UserRoutes>
//             <CardProductDetails />
//           </UserRoutes>
//         )
//       },
//       {
//         path: "cart",
//         element: (
//           <UserRoutes>
//             <Cart />
//           </UserRoutes>
//         )
//       },
//       {
//         path: "search",
//         element: (
//           <UserRoutes>
//             <SearchProduct />
//           </UserRoutes>
//         )
//       },
//       {
//         path: "forgot-password",
//         element: <ForgetPassword />
//       }
//     ]
//   },



{
    path:"/admin/sign-up",
    element:<AdminSignup/>
},
{
    path:"/admin/login",
    element: <AdminLogin/>
},
{   
    element:(
        <ProtectedRoute> 
        <AdminPanel/>
        </ProtectedRoute>
    ),
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
        path:`/admin/edit-cart/:id`,
        element:<EditProducts/>
       },
       {
        path:`/admin/delete-product/:id`,
        element:<DeleteProducts/>
       },
        {
            path:"/admin/forgot-password",
            element:<AdForgetPassword/>
        }    
    ]
},
// {
//     // this is for manager
// }


])

export default router;





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