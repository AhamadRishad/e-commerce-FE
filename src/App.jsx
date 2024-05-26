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
      <main className="min-h-[calc(100vh-100px)]"> 
        <Outlet />
      </main>
      <ToastContainer autoClose='700' position='bottom-right'></ToastContainer>
      <Footer />

    </>
  );
}

export default App;
