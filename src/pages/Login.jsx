
import { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Login = () => {

    const[showPassword, setShowPassword] = useState(false)
    const[data, setData] = useState({
        email : "",
        password : ""
    })

    const handleOnChange = (e) => {
        const {name , value} = e.target

        setData((preve) => {
            return {
               ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = (e) => {
        console.log("hitted")
        e.preventDefault()
        
    }

    console.log("data login",data)


  return (
   <section id='login'>
    <div className='mx-auto container p-4'>

      <div className='bg-white p-5 py-5 w-full max-w-sm mx-auto rounded'>
        <div className='w-20 h-20 mx-auto'>
            <img src={loginIcon} alt='login icon'/>
        </div>

        <form className='pt-6 flex flex-col gap2' onSubmit={handleSubmit}>
            <div className='grid'>
                <label >Email :</label>
               <div  className='bg-slate-100 p-2 '>
               <input
                type='email' 
                value={data.email}
                placeholder='Enter your email here...' 
                onChange={handleOnChange}
                name='email'
                className='w-full h-full outline-none bg-transparent'></input>
               </div>
            </div>
            <div>
                <label >Password :</label>
                <div className='bg-slate-100 p-2 flex'>
                <input 
                type={showPassword? "text" : "password"}
                 placeholder='Enter your password here...'
                 name='password'
                 value={data.password}
                 onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'>

                  </input>
                  <div className='cursor-pointer text-2xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                    <span>
                        {
                            showPassword? <FaEyeSlash/> : <FaEye />
                        }
                       
                    </span>
                  </div>
                </div>
                <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                    Forgot password ?
                </Link>
            </div>

            <button className='bg-red-600 hover:bg-red-700 text-white  px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

        </form>

        <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className='text-red-600 hover:underline hover:text-red-700'>sign up</Link></p>

      </div>

    </div>
   </section>
  )
}

export default Login


