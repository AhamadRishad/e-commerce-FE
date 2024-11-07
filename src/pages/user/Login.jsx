// import { useState } from 'react'
// import Cookies from "js-cookie";
// import loginIcon from '../../assets/signin.gif'
// import { FaEye, FaEyeSlash } from 'react-icons/fa6'
// import { Link, useNavigate } from 'react-router-dom'

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import ToastStyledContaner from '../../components/ToastStyledContaner';

// const Login = () => {
//   // var token=null;
//   const navigate = useNavigate()
//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.post(
//         // "http://localhost:3000/api/v1/user/signin",
//         `${import.meta.env.VITE_API_URL}/user/signin`,
//         data,);

//       console.log(data);
//       console.log(res.data);

//       // Cookies.set('token', res.data.token)
//       // toast.success('Login successful');
//       // navigate("/")

//       if (res.data.success) {
//         Cookies.set('token', res.data.token);
//         toast.success(res.data.message);
//         navigate("/");
//       } else {
//         toast.error(res.data.message);
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || 'Login failed');

//     }
//   };

//     const[showPassword, setShowPassword] = useState(false)

//     let userSchema = yup.object({

//         email: yup.string().required().email(),
//         password: yup.string().required().min(6),

//       });

//           const {register, handleSubmit,  formState: { errors }} = useForm({resolver : yupResolver(userSchema)});

//   return (
//    <section id='login'>
//     <ToastStyledContaner/>
//     <div className='mx-auto container p-4'>

//       <div className='bg-white p-5 py-5 w-full max-w-sm mx-auto rounded'>
//         <div className='w-20 h-20 mx-auto '>
//             <img className='rounded-full' src={loginIcon} alt='login icon'/>
//         </div>

//         <form  onSubmit={handleSubmit(onSubmit)} className='pt-6 flex flex-col gap2' >
//             <div className='grid'>
//                 <label >Email :</label>
//                <div  className='bg-slate-100 p-2 '>
//                <input
//                 {...register("email")}
//                 placeholder='Enter your email here...'
//                 className='w-full h-full outline-none bg-transparent'/>

//                </div>
//                {errors.email && <p  className="text-red-600 hover:underline hover:text-red-700">{errors.email.message}</p>}
//             </div>

//             <div>
//                 <label >Password :</label>
//                 <div className='bg-slate-100 p-2 flex'>
//                 <input
//                 {...register("[password")}
//                 type={showPassword? "text" : "password"}
//                  placeholder='Enter your password here...'
//                   className='w-full h-full outline-none bg-transparent'/>

//                   <div className='cursor-pointer text-2xl' onClick={()=>setShowPassword((preve)=>!preve)}>
//                     <span>
//                         {
//                             showPassword? <FaEyeSlash/> : <FaEye />
//                         }

//                     </span>
//                   </div>

//                 </div>
//                 {errors.password && <p  className="text-red-600 hover:underline hover:text-red-700  ">{errors.password.message}</p>}
//                 <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
//                     Forgot password ?
//                 </Link>
//             </div>

//             <button type="submit" className='bg-red-600 hover:bg-red-700 text-white  px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

//         </form>

//         <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className='text-red-600 hover:underline hover:text-red-700'>sign up</Link></p>

//       </div>

//     </div>
//    </section>
//   )
// }

// export default Login

import { useState } from "react";
import Cookies from "js-cookie";
import loginIcon from "../../assets/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import ToastStyledContaner from "../../components/ToastStyledContaner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add loading state
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true when login starts
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/signin`,
        data
      );

      if (res.data.success) {
        Cookies.set("token", res.data.token);
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); // Set loading back to false after request completes
    }
  };

  const userSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  // Skeleton Loader Component
  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-300 rounded ${className}`}></div>
  );

  return (
    <section id="login">
      <ToastStyledContaner />
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 py-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto ">
            <img className="rounded-full" src={loginIcon} alt="login icon" />
          </div>

          {loading ? (
            // Skeleton Loaders
            <div className="pt-6 flex flex-col gap-4">
              <Skeleton className="h-10 w-full" />
              {/* <Skeleton  className='h-10 w-full text-black'> Loading</Skeleton> */}
              {/* <div className='text-black h-10 w-full text-center font-medium	 '>Loading</div> */}
              <div className="text-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>

              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="pt-6 flex flex-col gap2"
            >
              <div className="grid">
                <label>Email:</label>
                <div className="bg-slate-100 p-2">
                  <input
                    {...register("email")}
                    placeholder="Enter your email here..."
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 hover:underline hover:text-red-700">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label>Password:</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password here..."
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-2xl"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-600 hover:underline hover:text-red-700">
                    {errors.password.message}
                  </p>
                )}
                <Link
                  to={"/forgot-password"}
                  className="block w-fit ml-auto hover:underline hover:text-red-600"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className={`bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full transition-all mx-auto block mt-6 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
          )}

          <p className="my-5">
            Don't have an account?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:underline hover:text-red-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
