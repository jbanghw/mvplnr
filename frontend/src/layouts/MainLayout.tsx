import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { ToastContainer } from "react-toastify"
import Footer from "../components/Footer"

const MainLayout = () => {
  return (
    <div className="min-h-screen max-w-full flex flex-col justify-between items-center">
      <Navbar />
      <Outlet />
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default MainLayout