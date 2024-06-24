import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import ToastStyledContaner from '../../components/ToastStyledContaner'

const AdminPanel = () => {
  return (
    <div>
          <div className="bg-slate-100 dark:bg-gray-900 text-black dark:text-white">   

       <AdminNavbar/>
       
        <div>  
        {/* this link is not compleated only manager can see this tab */}
       
       {/* <Link 
       to={"manager-panel"}>hello
       </Link> */}
        </div>
        <Outlet/>
        <ToastStyledContaner />
        {/* neeed footer */}
    </div>
    </div>
  )
}

export default AdminPanel