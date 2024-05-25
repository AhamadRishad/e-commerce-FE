
import { useState } from 'react'
import Cookies from "js-cookie";
import loginIcon from '../../assets/signin.gif'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  // var token=null;
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/signin",data, {Credentials: true});
      
      console.log(data);
      console.log(res.data);
      // toast.success('Login successfull');
      Cookies.set('token', res.data.token)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

    const[showPassword, setShowPassword] = useState(false)

    let userSchema = yup.object({
       
        email: yup.string().required().email(),
        password: yup.string().required().min(6),
      
      });
      

          const {register, handleSubmit,  formState: { errors }} = useForm({resolver : yupResolver(userSchema)});


          
    

  return (
   <section id='login'>
    <div className='mx-auto container p-4'>

      <div className='bg-white p-5 py-5 w-full max-w-sm mx-auto rounded'>
        <div className='w-20 h-20 mx-auto'>
            <img src={loginIcon} alt='login icon'/>
        </div>

        <form  onSubmit={handleSubmit(onSubmit)} className='pt-6 flex flex-col gap2' >
            <div className='grid'>
                <label >Email :</label>
               <div  className='bg-slate-100 p-2 '>
               <input   
                {...register("email")}            
                placeholder='Enter your email here...'
                className='w-full h-full outline-none bg-transparent'/>
                
               </div>
               {errors.email && <p  className="text-red-600 hover:underline hover:text-red-700">{errors.email.message}</p>}
            </div>


            <div>
                <label >Password :</label>
                <div className='bg-slate-100 p-2 flex'>
                <input 
                {...register("[password")}     
                type={showPassword? "text" : "password"}
                 placeholder='Enter your password here...'
                  className='w-full h-full outline-none bg-transparent'/>
                  
              
                  <div className='cursor-pointer text-2xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                    <span>
                        {
                            showPassword? <FaEyeSlash/> : <FaEye />
                        }
                       
                    </span>
                  </div>
                  
                </div>
                {errors.password && <p  className="text-red-600 hover:underline hover:text-red-700  ">{errors.password.message}</p>}
                <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                    Forgot password ?
                </Link>
            </div>

            <button type="submit" className='bg-red-600 hover:bg-red-700 text-white  px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

        </form>

        <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className='text-red-600 hover:underline hover:text-red-700'>sign up</Link></p>

      </div>

    </div>
   </section>
  )
}

export default Login


