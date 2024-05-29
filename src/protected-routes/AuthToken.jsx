// import Cookies from "js-cookie";
// import { useNavigate } from 'react-router-dom';
// const AuthToken = ({children}) => {
//     const navigate = useNavigate();
//     const token = Cookies.get("token");
//     console.log(token);
//     if(token === undefined) {
//         navigate("login",{replace:true})
//     }
//   return children ;
// }
// export default AuthToken
// import Cookies from "js-cookie";
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// const AuthToken = ({ children }) => {
//     const navigate = useNavigate();
//     const token = Cookies.get("token");
//     useEffect(() => {
//         if (token === undefined) {
//             navigate("login", { replace: true });
//         }
//     }, [token, navigate]);
//     if (token === undefined) {
//         return null; // Prevent rendering children while navigating
//     }
//     return children;
// }
// export default AuthToken;










//below this accepted



// import Cookies from "js-cookie";
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// const AuthToken = ({ children }) => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = Cookies.get("token");
//         console.log(token);
      
        
//         if (token === undefined) {
//             navigate("/login", { replace: true });
//         }
//     }, [navigate]);

//     // const token = Cookies.get("token");
//     // if (token === null) {
//     //     // return null; // Prevent rendering children while navigating
//     //     Navigate("/login",{replace:true})
//     // }

//     return children;
// }

// export default AuthToken;
