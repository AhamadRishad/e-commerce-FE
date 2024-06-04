import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import { ToastContainer } from 'react-toastify'

const AdminPanel = () => {
  return (
    <div>

       <AdminNavbar/>
       
        <div>  
        {/* this link is not compleated only manager can see this tab */}
       
       {/* <Link 
       to={"manager-panel"}>hello
       </Link> */}
        </div>
        <Outlet/>
        <ToastContainer autoClose='700' position='bottom-right'></ToastContainer>
        {/* neeed footer */}
    </div>
  )
}

export default AdminPanel