import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  
  return (
    <>
     <Header />
      <main className="min-h-[calc(100vh-100px)] pt-16"> 
        <Outlet />
      </main>
      {/* <ToastContainer autoClose='700' position='bottom-right'></ToastContainer> */}
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
      <Footer />

    </>
  );
}

export default App;
