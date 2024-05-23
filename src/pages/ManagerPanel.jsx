import React from 'react'
import { Outlet } from 'react-router-dom'

const ManagerPanel = () => {
  return (
    <div>
        <h1>Manager panel</h1>
        <Outlet/>
    </div>
  )
}

export default ManagerPanel