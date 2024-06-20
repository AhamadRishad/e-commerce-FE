
//  import React from 'react'
// import { Outlet } from 'react-router-dom'

// const AdminPanel = () => {
//     // const user = useSelector(state => state?.user?.user)
//     // const navigate = useNavigate()


//     // useEffect(()=>{
//     //     if(user?.role !== ROLE.ADMIN){
//     //         navigate("/")
//     //     }
//     // },[user])

//   return (
//     <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

//     <aside className='bg-white min-h-full  w-full  max-w-60 customShadow'>
//             <div className='h-32  flex justify-center items-center flex-col'>
//                 <div className='text-5xl cursor-pointer relative flex justify-center'>
//                     {/* {
//                     user?.profilePic ? (
//                         <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
//                     ) : (
//                         <FaRegCircleUser/>
//                     )
//                     } */}
//                 </div>
//                 {/* <p className='capitalize text-lg font-semibold'>{user?.name}</p>
//                 <p className='text-sm'>{user?.role}</p> */}
//             </div>

//              {/***navigation */}       
//             <div>   
//                 <nav className='grid p-4'>
//                     <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
//                     <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
//                 </nav>
//             </div>  
//     </aside>

//     <main className='w-full h-full p-2'>
//         <Outlet/>
//     </main>
// </div>
//   )
// }

// export default AdminPanel 

// import React from 'react'
// import { FaRegCircleUser } from 'react-icons/fa6'
// import { Link, Outlet } from 'react-router-dom'

// const ManagerPanel = () => {


//   return (
//     <>  
//     {/* <div > 
//       <h1 className='@media (min-width: 768px) { ... }'>hellow</h1>
//     </div> */}
//     <div className='min-h-[calc(100vh-100px)] md:flex hidden'>
//         <aside className='bg-white min-h-full  w-full  max-w-60 customShadow'>
//         <div className='h-32  flex justify-center items-center flex-col'>
//         <div className='text-5xl cursor-pointer relative flex justify-center'> 
//           <FaRegCircleUser/>
//           </div>
//           <p className='capitalize text-lg font-semibold'>Rishad</p>
//         <p className='text-sm'>Admin</p> 
//         </div>

//         <div>   
//                  <nav className='grid p-4'>
//                     <Link to={'manager/all-user'}className='px-2 py-1 hover:bg-slate-100 ' > All Users</Link>
//                     <Link to={'manager/all-admins'}className='px-2 py-1 hover:bg-slate-100 ' > All Admin</Link>
//                     <Link to={'manager/all-orders'}className='px-2 py-1 hover:bg-slate-100 ' > All Orders</Link>
//                     <Link to={'manager/product-requests'}className='px-2 py-1 hover:bg-slate-100 ' > All Products</Link>
//                     {/* <Link to={}> All Products</Link> */}
//                  </nav>
//              </div>  
           
//         </aside>


//         <main  className='w-full h-full p-2'>
//         <Outlet/>
//         </main>


//     </div>
   
//     </>
//   )
// }

// export default ManagerPanel














import React from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { Link, Outlet } from 'react-router-dom'

const ManagerPanel = () => {
  return (
    <>  
     <div className="bg-slate-100 dark:bg-gray-900 text-black dark:text-white"> 
      <div className='min-h-[calc(100vh-100px)] flex flex-col md:flex-row overflow-hidden'>
        <aside className='bg-slate-200 dark:bg-black text-black dark:text-white min-h-full w-full md:w-1/4 lg:w-1/5 customShadow'>
          {/* <div className='h-32 flex justify-center items-center flex-col'>
            <div className='text-5xl cursor-pointer relative flex justify-center'> 
               <FaRegCircleUser/>
             </div>
             <p className='capitalize text-lg font-semibold'>Rishad</p>
             <p className='text-sm'>Admin</p>  
          </div>   */}

          <div>   
            <nav className='grid p-4 w-40 '>
              <Link to={'manager/all-user'} className='px-2 py-1 hover:bg-slate-100 dark:hover:bg-gray-800 rounded'> All Users</Link>
              <Link to={'manager/all-admins'} className='px-2 py-1 hover:bg-slate-100 dark:hover:bg-gray-800 rounded'> All Admin</Link>
              <Link to={'manager/all-orders'} className='px-2 py-1 hover:bg-slate-100 dark:hover:bg-gray-800 rounded'> All Orders</Link>
              <Link to={'manager/product-requests'} className='px-2 py-1 hover:bg-slate-100 dark:hover:bg-gray-800 rounded'> All Products</Link>
            </nav>
          </div>  
        </aside>

        <main className='w-full h-full p-2'>
        <div className="bg-slate-100 dark:bg-gray-900 text-black dark:text-white"> 
          <Outlet/>
          </div>
        </main>
      </div>
      </div>
    </>
  )
}

export default ManagerPanel
