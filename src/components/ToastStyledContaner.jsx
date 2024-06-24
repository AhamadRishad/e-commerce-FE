import React from 'react'
import { ToastContainer } from 'react-toastify'

const ToastStyledContaner = () => {
  return (
    <ToastContainer
    position="top-right"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    className="md:top-4 md:right-4 md:bottom-auto md:left-auto bottom-4 right-4 "
/>
  )
}

export default ToastStyledContaner