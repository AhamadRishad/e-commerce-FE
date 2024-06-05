
import {  useState } from 'react'
import Cookies from "js-cookie";
import loginIcon from '../../assets/signin.gif'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  // var token=null;
  const navigate = useNavigate()

  // useEffect(()=>{
  //   const AdminToken = Cookies.get("AdminToken")
  //   if(AdminToken){
  //       navigate("/admin/my-upload")
  //     return;
          
  //   }
    
      
  // },[])
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/admin/login",data);
      Cookies.set('AdminToken', res.data.AdminToken)
      console.log(data);
      console.log(res.data);
  //     if (token) {
  //       res.setHeader('Set-Cookie', `access_token=${token}; Secure; HttpOnly;`);
  //  console.log({token})
  //     } else {
  //       console.log({token})
  //     }
    //   res.Cookies.get(token);
    // console.log(token);
    // const token = Cookies.get("token");
    //     console.log(token);
    //     if(token === undefined) {
    //         navigate("/admin/signup",{replace:true})
    //         toast.success('Login failed');
    //     }else{
    //       navigate("/admin/my-upload")
    //       toast.success('Login successfull');
    //     }
    
    toast.success('Login successfull');
      navigate("/admin/my-upload")
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
        <h3 className='mx-auto ml-20 md:block '>Admin Login</h3>
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
                <Link to={'/admin/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                    Forgot password ?
                </Link>
            </div>

            <button type="submit" className='bg-red-600 hover:bg-red-700 text-white  px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

        </form>

        <p className='my-5'>Don't have account ? <Link to={"/admin/sign-up"} className='text-red-600 hover:underline hover:text-red-700'>sign up</Link></p>

      </div>

    </div>
   </section>
  )
}

export default AdminLogin


