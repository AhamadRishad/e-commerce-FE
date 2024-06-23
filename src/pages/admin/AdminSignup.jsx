
import { Link, useNavigate } from "react-router-dom";
import loginIcons from "../../assets/signin.gif";

import Cookies from "js-cookie"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";


let userSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  mobile:yup.number().required().min(10),
});

const AdminSignup = () => {
    const {register, handleSubmit,  formState: { errors }} = useForm({resolver : yupResolver(userSchema)});

    const navigate = useNavigate()



  const onSubmit = async (data) => {
    try {
       const res = await axios.post(
        // "http://localhost:3000/api/v1/admin/signup",
        `${import.meta.env.VITE_API_URL}/admin/login`,
        data);
      console.log(res.data);
      // Cookies.set('token', res.data.token)
      toast.success('Login successfull');
      navigate("/admin/login")
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const [showPassword,setShowPassword] = useState(false)

  
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
      <h3 className='mx-auto ml-20 md:block '>Admin Login</h3>
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              {/* <img src={data.profilePic || loginIcons} alt="login icons" /> */}
              <img src={loginIcons} alt="login icons" />
            </div>
            <form >
              {/* <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input type="file"   className="hidden" />
                add user image in feature
              </label> */}
            </form>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="pt-6 flex flex-col gap-2" >
            <div className="grid">
              <label>Name : </label>
              <div className="bg-slate-100 p-2">

                <input
                  {...register("name")}
                  placeholder=" name"
                  className="w-full h-full outline-none bg-transparent"
                />



              </div>
              {errors.name && <p className="text-red-600 hover:underline hover:text-red-700">{errors.name.message}</p>}

            </div>

            <div className="grid">
              <label>Mobile No. : </label>
              <div className="bg-slate-100 p-2">

                <input
                  {...register("mobile")}
                  placeholder="mobile no."
                  className="w-full h-full outline-none bg-transparent"
                />



              </div>
              {errors.mobile && <p className="text-red-600 hover:underline hover:text-red-700">{errors.mobile.message}</p>}

            </div>

            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 p-2">


                <input
                  {...register("email")}
                  placeholder=" email"
                  className="w-full h-full outline-none bg-transparent"
                />

                

              </div>
              {errors.email && <p className="text-red-600 hover:underline hover:text-red-700">{errors.email.message}</p>}

            </div>

            <div>
              <label>Password : </label>
              <div className="bg-slate-100 p-2 flex">
                

                <input
                  {...register("password")}
                  placeholder=" password"
                  className="w-full h-full outline-none bg-transparent"
                  type={showPassword? "text" : "password"}
                />


                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              {errors.password && <p className="text-red-600 hover:underline hover:text-red-700">{errors.password.message}</p>}

            </div>

            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>

          <p className="my-5">
            Already have account ?{" "}
            <Link
              to={"/admin/login"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminSignup;
