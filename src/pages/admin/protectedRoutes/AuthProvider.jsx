// import { createContext, useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie';
// import axios from "axios";


// export const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = Cookies.get('token');
//         if (!token) {
//             navigate('/admin/login');
//         } else {
//             axios.post('http://localhost:3000/api/v1/admin/verify', { token })
//                 .then(response => {
//                     if (response.data.success) {
//                         setIsAuthenticated(true);
//                     } else {
//                         navigate('/admin/login');
//                     }
//                 })
//                 .catch(() => {
//                     navigate('/admin/login');
//                 });
//         }
//     }, [navigate]);


//     return (
//         <AuthContext.Provider value={{ isAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     );


// }

// import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from 'js-cookie';
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = Cookies.get('token');
//         if (!token) {
//             setIsAuthenticated(false);
//         } else {
//             axios.post('http://localhost:3000/api/v1/admin/verify', { token })
//                 .then(response => {
//                     if (response.data.success) {
//                         setIsAuthenticated(true);
//                     } else {
//                         setIsAuthenticated(false);
//                         Cookies.remove('token');
//                     }
//                 })
//                 .catch(() => {
//                     setIsAuthenticated(false);
//                     Cookies.remove('token');
//                 });
//         }
//     }, []);

//     const login = (token) => {
//         Cookies.set('token', token);
//         setIsAuthenticated(true);
//         navigate('/admin/my-upload'); // Redirect to a protected route
//     };

//     const logout = () => {
//         Cookies.remove('token');
//         setIsAuthenticated(false);
//         navigate('/admin/login');
//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
