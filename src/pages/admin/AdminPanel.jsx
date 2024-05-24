import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const AdminPanel = () => {
  return (
    <div>

        
       
        <div>  
        {/* this link is not compleated only manager can see this tab */}
        <Link to={'upload-cart'}> upload cart</Link><br /><br />
       {/* <Link 
       to={"manager-panel"}>hello
       </Link> */}
        </div>
        <Outlet/>
    </div>
  )
}

export default AdminPanel